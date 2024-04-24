import type { Where } from 'payload/types'

import httpStatus from 'http-status'
import { findVersionsOperationGlobal } from 'payload/operations'
import { isNumber } from 'payload/utilities'

import type { GlobalRouteHandler } from '../types.js'

import { headersWithCors } from '../../../utilities/headersWithCors.js'

export const findVersions: GlobalRouteHandler = async ({ globalConfig, req }) => {
  const { depth, limit, page, sort, where } = req.query as {
    depth?: string
    limit?: string
    page?: string
    sort?: string
    where?: Where
  }

  const result = await findVersionsOperationGlobal({
    depth: isNumber(depth) ? Number(depth) : undefined,
    globalConfig,
    limit: isNumber(limit) ? Number(limit) : undefined,
    page: isNumber(page) ? Number(page) : undefined,
    req,
    sort,
    where,
  })

  return Response.json(result, {
    headers: headersWithCors({
      headers: new Headers(),
      req,
    }),
    status: httpStatus.OK,
  })
}
