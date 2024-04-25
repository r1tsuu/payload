import payload from '../../packages/payload/src'
import { devUser } from '../credentials'
import { initPayloadTest } from '../helpers/configHelpers'
import { localizedSlug } from './collections/Localized'
import { postsSlug } from './collections/Posts'

require('isomorphic-fetch')

let apiUrl
let jwt

const headers = {
  'Content-Type': 'application/json',
}
const { email, password } = devUser
describe('_Community Tests', () => {
  // --__--__--__--__--__--__--__--__--__
  // Boilerplate test setup/teardown
  // --__--__--__--__--__--__--__--__--__
  beforeAll(async () => {
    const { serverURL } = await initPayloadTest({ __dirname, init: { local: false } })
    apiUrl = `${serverURL}/api`

    const response = await fetch(`${apiUrl}/users/login`, {
      body: JSON.stringify({
        email,
        password,
      }),
      headers,
      method: 'post',
    })

    const data = await response.json()
    jwt = data.token
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy(payload)
    }
  })

  // --__--__--__--__--__--__--__--__--__
  // You can run tests against the local API or the REST API
  // use the tests below as a guide
  // --__--__--__--__--__--__--__--__--__

  it('local API example', async () => {
    const newPost = await payload.create({
      collection: postsSlug,
      data: {
        text: 'LOCAL API EXAMPLE',
      },
    })

    expect(newPost.text).toEqual('LOCAL API EXAMPLE')
  })

  it('rest API example', async () => {
    const newPost = await fetch(`${apiUrl}/${postsSlug}`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `JWT ${jwt}`,
      },
      body: JSON.stringify({
        text: 'REST API EXAMPLE',
      }),
    }).then((res) => res.json())

    expect(newPost.doc.text).toEqual('REST API EXAMPLE')
  })

  it('should prorly work localized group field', async () => {
    const result = await payload.create({
      collection: localizedSlug,
      locale: 'en',
      data: {
        groupLocalized: {
          title: 'hello en',
        },
      },
    })

    expect(result.groupLocalized.title).toBe('hello en')

    await payload.update({
      collection: localizedSlug,
      locale: 'de',
      id: result.id,
      data: {
        groupLocalized: {
          title: 'hello de',
        },
      },
    })

    const docEn = await payload.findByID({ collection: localizedSlug, locale: 'en', id: result.id })
    const docDe = await payload.findByID({ collection: localizedSlug, locale: 'de', id: result.id })

    expect(docEn.groupLocalized.title).toBe('hello en')
    expect(docDe.groupLocalized.title).toBe('hello de')
  })

  it('should prorly work localizde field inside of group', async () => {
    const result = await payload.create({
      collection: localizedSlug,
      locale: 'en',
      data: {
        group: {
          title: 'hello en',
        },
      },
    })

    // expect(result.group.title).toBe('hello en')

    await payload.update({
      collection: localizedSlug,
      locale: 'de',
      id: result.id,
      data: {
        group: {
          title: 'hello de',
        },
      },
    })

    const docEn = await payload.findByID({ collection: localizedSlug, locale: 'en', id: result.id })
    const docDe = await payload.findByID({ collection: localizedSlug, locale: 'de', id: result.id })

    expect(docEn.group.title).toBe('hello en')
    expect(docDe.group.title).toBe('hello de')
  })
})
