import type { Endpoint, PayloadHandler } from 'payload/config'

import { addDataAndFileToRequest } from '@payloadcms/next/utilities'
import httpStatus from 'http-status'

export const handler: PayloadHandler = async (incomingRequest) => {
  const reqWithData = await addDataAndFileToRequest({ request: incomingRequest })

  const { data, payload, user } = reqWithData
  const operation = data?.operation ? String(data.operation) : undefined

  if (data?.operation && typeof payload[operation] === 'function') {
    try {
      const result = await payload[operation]({
        ...(typeof data.args === 'object' ? data.args : {}),
        user,
      })

      return Response.json(result, {
        status: httpStatus.OK,
      })
    } catch (err) {
      payload.logger.error(err)
      return Response.json(err, {
        status: httpStatus.BAD_REQUEST,
      })
    }
  }

  return Response.json(
    {
      message: 'Payload Local API method not found.',
    },
    {
      status: httpStatus.BAD_REQUEST,
    },
  )
}

export const localAPIEndpoint: Endpoint = {
  path: '/local-api',
  method: 'post',
  handler,
}
