import type { ContainerClient } from '@azure/storage-blob'
import type { CollectionConfig } from 'payload/types'

import path from 'path'

import type { StaticHandler } from '../../types.js'

import { getFilePrefix } from '../../utilities/getFilePrefix.js'
import getRangeFromHeader from '../../utilities/getRangeFromHeader.js'

interface Args {
  collection: CollectionConfig
  getStorageClient: () => ContainerClient
}

export const getHandler = ({ collection, getStorageClient }: Args): StaticHandler => {
  return async (req, { params: { filename } }) => {
    try {
      const prefix = await getFilePrefix({ collection, filename, req })
      const blockBlobClient = getStorageClient().getBlockBlobClient(
        path.posix.join(prefix, filename),
      )

      const { end, start } = await getRangeFromHeader(blockBlobClient, req.headers.get('range'))

      const blob = await blockBlobClient.download(start, end)
      // eslint-disable-next-line no-underscore-dangle
      const response = blob._response

      // Manually create a ReadableStream for the web from a Node.js stream.
      const readableStream = new ReadableStream({
        start(controller) {
          const nodeStream = blob.readableStreamBody
          nodeStream.on('data', (chunk) => {
            controller.enqueue(new Uint8Array(chunk))
          })
          nodeStream.on('end', () => {
            controller.close()
          })
          nodeStream.on('error', (err) => {
            controller.error(err)
          })
        },
      })

      return new Response(readableStream, {
        headers: response.headers.rawHeaders(),
        status: response.status,
      })
    } catch (err: unknown) {
      req.payload.logger.error(err)
      return new Response('Internal Server Error', { status: 500 })
    }
  }
}
