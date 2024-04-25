import type { Endpoint, PayloadHandler } from 'payload/config'

import { addDataAndFileToRequest } from '@payloadcms/next/utilities'
import httpStatus from 'http-status'

import { path } from './reInitializeDB.js'
import { seedDB } from './seed.js'

const handler: PayloadHandler = async (req) => {
  process.env.SEED_IN_CONFIG_ONINIT = 'true'
  const reqWithData = await addDataAndFileToRequest({ request: req })
  const { data, payload } = reqWithData

  try {
    await seedDB({
      _payload: payload,
      collectionSlugs: payload.config.collections.map(({ slug }) => slug),
      seedFunction: payload.config.onInit,
      snapshotKey: String(data.snapshotKey),
      uploadsDir: String(data.uploadsDir),
    })

    return Response.json(
      {
        message: 'Database reset and onInit run successfully.',
      },
      {
        status: httpStatus.OK,
      },
    )
  } catch (err) {
    payload.logger.error(err)
    return Response.json(err, {
      status: httpStatus.BAD_REQUEST,
    })
  }
}

export const reInitEndpoint: Endpoint = {
  path,
  method: 'post',
  handler,
}
