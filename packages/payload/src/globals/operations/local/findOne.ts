import type { GeneratedTypes, Payload, RequestContext } from '../../../index.js'
import type { Document, PayloadRequestWithData } from '../../../types/index.js'

import { APIError } from '../../../errors/index.js'
import { createLocalReq } from '../../../utilities/createLocalReq.js'
import { findOneOperation } from '../findOne.js'

export type Options<T extends keyof GeneratedTypes['globals']> = {
  context?: RequestContext
  depth?: number
  draft?: boolean
  fallbackLocale?: GeneratedTypes['locale']
  locale?: 'all' | GeneratedTypes['locale']
  overrideAccess?: boolean
  req?: PayloadRequestWithData
  showHiddenFields?: boolean
  slug: T
  user?: Document
}

export default async function findOneLocal<T extends keyof GeneratedTypes['globals']>(
  payload: Payload,
  options: Options<T>,
): Promise<GeneratedTypes['globals'][T]> {
  const {
    slug: globalSlug,
    depth,
    draft = false,
    overrideAccess = true,
    showHiddenFields,
  } = options

  const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug)

  if (!globalConfig) {
    throw new APIError(`The global with slug ${String(globalSlug)} can't be found.`)
  }

  return findOneOperation({
    slug: globalSlug as string,
    depth,
    draft,
    globalConfig,
    overrideAccess,
    req: await createLocalReq(options, payload),
    showHiddenFields,
  })
}
