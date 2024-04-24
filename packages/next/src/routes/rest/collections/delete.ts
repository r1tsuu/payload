import type { Where } from 'payload/types'

import { getTranslation } from '@payloadcms/translations'
import httpStatus from 'http-status'
import { deleteOperation } from 'payload/operations'
import { isNumber } from 'payload/utilities'

import type { CollectionRouteHandler } from '../types.js'

import { headersWithCors } from '../../../utilities/headersWithCors.js'

export const deleteDoc: CollectionRouteHandler = async ({ collection, req }) => {
  const { depth, where } = req.query as {
    depth?: string
    where?: Where
  }

  const result = await deleteOperation({
    collection,
    depth: isNumber(depth) ? Number(depth) : undefined,
    req,
    where,
  })

  const headers = headersWithCors({
    headers: new Headers(),
    req,
  })

  if (result.errors.length === 0) {
    const message = req.t('general:deletedCountSuccessfully', {
      count: result.docs.length,
      label: getTranslation(
        collection.config.labels[result.docs.length > 1 ? 'plural' : 'singular'],
        req.i18n,
      ),
    })

    return Response.json(
      {
        ...result,
        message,
      },
      {
        headers,
        status: httpStatus.OK,
      },
    )
  }

  const total = result.docs.length + result.errors.length

  const message = req.t('error:unableToDeleteCount', {
    count: result.errors.length,
    label: getTranslation(collection.config.labels[total > 1 ? 'plural' : 'singular'], req.i18n),
    total,
  })

  return Response.json(
    {
      ...result,
      message,
    },
    {
      headers,
      status: httpStatus.BAD_REQUEST,
    },
  )
}
