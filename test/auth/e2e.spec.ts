import type { Page } from '@playwright/test'

import { expect, test } from '@playwright/test'
import { devUser } from 'credentials.js'
import path from 'path'
import { wait } from 'payload/utilities'
import { fileURLToPath } from 'url'
import { v4 as uuid } from 'uuid'

import type { PayloadTestSDK } from '../helpers/sdk/index.js'
import type { Config } from './payload-types.js'

import { initPageConsoleErrorCatch, saveDocAndAssert } from '../helpers.js'
import { AdminUrlUtil } from '../helpers/adminUrlUtil.js'
import { initPayloadE2ENoConfig } from '../helpers/initPayloadE2ENoConfig.js'
import { POLL_TOPASS_TIMEOUT } from '../playwright.config.js'
import { apiKeysSlug, slug } from './shared.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

let payload: PayloadTestSDK<Config>

const { beforeAll, describe } = test

const headers = {
  'Content-Type': 'application/json',
}

const createFirstUser = async ({ page, serverURL }: { page: Page; serverURL: string }) => {
  await page.goto(serverURL + '/admin/create-first-user')
  await page.locator('#field-email').fill(devUser.email)
  await page.locator('#field-password').fill(devUser.password)
  await page.locator('#field-confirm-password').fill(devUser.password)
  await page.locator('#field-custom').fill('Hello, world!')

  await wait(500)

  await page.locator('.form-submit > button').click()

  await expect
    .poll(() => page.url(), { timeout: POLL_TOPASS_TIMEOUT })
    .not.toContain('create-first-user')
}

describe('auth', () => {
  let page: Page
  let url: AdminUrlUtil
  let serverURL: string
  let apiURL: string

  // Allows for testing create-first-user
  process.env.SKIP_ON_INIT = 'true'

  beforeAll(async ({ browser }) => {
    ;({ payload, serverURL } = await initPayloadE2ENoConfig<Config>({ dirname }))
    apiURL = `${serverURL}/api`
    url = new AdminUrlUtil(serverURL, slug)

    const context = await browser.newContext()
    page = await context.newPage()
    initPageConsoleErrorCatch(page)

    await createFirstUser({ page, serverURL })

    await payload.create({
      collection: 'api-keys',
      data: {
        apiKey: uuid(),
        enableAPIKey: true,
      },
    })

    await payload.create({
      collection: 'api-keys',
      data: {
        apiKey: uuid(),
        enableAPIKey: true,
      },
    })
  })

  describe('authenticated users', () => {
    beforeAll(({ browser }) => {
      url = new AdminUrlUtil(serverURL, slug)
    })

    test('should allow change password', async () => {
      await page.goto(url.account)
      const emailBeforeSave = await page.locator('#field-email').inputValue()
      await page.locator('#change-password').click()
      await page.locator('#field-password').fill('password')
      await page.locator('#field-confirm-password').fill('password')

      await saveDocAndAssert(page)

      await expect(page.locator('#field-email')).toHaveValue(emailBeforeSave)
    })

    test('should have up-to-date user in `useAuth` hook', async () => {
      await page.goto(url.account)

      await expect(page.locator('#users-api-result')).toHaveText('Hello, world!')
      await expect(page.locator('#use-auth-result')).toHaveText('Hello, world!')

      const field = page.locator('#field-custom')
      await field.fill('Goodbye, world!')
      await saveDocAndAssert(page)

      await expect(page.locator('#users-api-result')).toHaveText('Goodbye, world!')
      await expect(page.locator('#use-auth-result')).toHaveText('Goodbye, world!')
    })
  })

  describe('api-keys', () => {
    let user

    beforeAll(async () => {
      url = new AdminUrlUtil(serverURL, apiKeysSlug)

      user = await payload.create({
        collection: apiKeysSlug,
        data: {
          apiKey: uuid(),
          enableAPIKey: true,
        },
      })
    })

    test('should enable api key', async () => {
      await page.goto(url.create)

      // click enable api key checkbox
      await page.locator('#field-enableAPIKey').click()

      // assert that the value is set
      const apiKeyLocator = page.locator('#apiKey')
      await expect
        .poll(async () => await apiKeyLocator.inputValue(), { timeout: POLL_TOPASS_TIMEOUT })
        .toBeDefined()

      const apiKey = await apiKeyLocator.inputValue()

      await saveDocAndAssert(page)

      await expect(async () => {
        const apiKeyAfterSave = await apiKeyLocator.inputValue()
        expect(apiKey).toStrictEqual(apiKeyAfterSave)
      }).toPass({
        timeout: POLL_TOPASS_TIMEOUT,
      })
    })

    test('should disable api key', async () => {
      await page.goto(url.edit(user.id))

      // click enable api key checkbox
      await page.locator('#field-enableAPIKey').click()

      // assert that the apiKey field is hidden
      await expect(page.locator('#apiKey')).toBeHidden()

      await saveDocAndAssert(page)

      // use the api key in a fetch to assert that it is disabled
      await expect(async () => {
        const response = await fetch(`${apiURL}/${apiKeysSlug}/me`, {
          headers: {
            ...headers,
            Authorization: `${apiKeysSlug} API-Key ${user.apiKey}`,
          },
        }).then((res) => res.json())

        expect(response.user).toBeNull()
      }).toPass({
        timeout: POLL_TOPASS_TIMEOUT,
      })
    })
  })
})
