import httpStatus from 'http-status'
import { updateOperationGlobal } from 'payload/operations'
import { isNumber } from 'payload/utilities'

import type { GlobalRouteHandler } from '../types.js'

import { headersWithCors } from '../../../utilities/headersWithCors.js'

export const update: GlobalRouteHandler = async ({ globalConfig, req }) => {
  const { searchParams } = req
  const depth = searchParams.get('depth')
  const draft = searchParams.get('draft') === 'true'
  const autosave = searchParams.get('autosave') === 'true'

  const result = await updateOperationGlobal({
    slug: globalConfig.slug,
    autosave,
    data: req.data,
    depth: isNumber(depth) ? Number(depth) : undefined,
    draft,
    globalConfig,
    req,
  })

  let message = req.t('general:updatedSuccessfully')

  if (draft) message = req.t('version:draftSavedSuccessfully')
  if (autosave) message = req.t('version:autosavedSuccessfully')

  return Response.json(
    {
      message,
      result,
    },
    {
      headers: headersWithCors({
        headers: new Headers(),
        req,
      }),
      status: httpStatus.OK,
    },
  )
}
