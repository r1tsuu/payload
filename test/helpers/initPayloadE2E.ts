import { getPayloadHMR } from '@payloadcms/next/utilities'
import { createServer } from 'http'
import nextImport from 'next'
import path from 'path'
import { type Payload } from 'payload/types'
import { wait } from 'payload/utilities'
import { parse } from 'url'

import { createTestHooks } from '../testHooks.js'
import startMemoryDB from './startMemoryDB.js'

type Args = {
  dirname: string
}

type Result = {
  payload: Payload
  serverURL: string
}

export async function initPayloadE2E({ dirname }: Args): Promise<Result> {
  const testSuiteName = path.basename(dirname)
  const { beforeTest } = await createTestHooks(testSuiteName)
  await beforeTest()
  await startMemoryDB()
  const { default: config } = await import(path.resolve(dirname, 'config.ts'))

  const payload = await getPayloadHMR({ config })

  const port = 3000
  process.env.PORT = String(port)
  const serverURL = `http://localhost:${port}`

  // @ts-expect-error
  const app = nextImport({
    dev: true,
    hostname: 'localhost',
    port,
    dir: path.resolve(dirname, '../../'),
  })

  const handle = app.getRequestHandler()

  let resolveServer

  const serverPromise = new Promise((res) => (resolveServer = res))

  // Need a custom server because calling nextDev straight
  // starts up a child process, and payload.onInit() is called twice
  // which seeds test data twice + other bad things.
  // We initialize Payload above so we can have access to it in the tests
  void app.prepare().then(() => {
    createServer(async (req, res) => {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    }).listen(port, () => {
      resolveServer()
    })
  })

  await serverPromise

  await wait(port)

  return { payload, serverURL }
}
