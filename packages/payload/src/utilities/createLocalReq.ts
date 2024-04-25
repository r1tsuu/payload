import type { User } from '../auth/types.js'
import type { Payload, RequestContext } from '../index.js'
import type { PayloadRequestWithData } from '../types/index.js'

import { getDataLoader } from '../collections/dataloader.js'
import { getLocalI18n } from '../translations/getLocalI18n.js'

function getRequestContext(
  req: PayloadRequestWithData = { context: null } as PayloadRequestWithData,
  context: RequestContext = {},
): RequestContext {
  if (req.context) {
    if (Object.keys(req.context).length === 0 && req.context.constructor === Object) {
      // if req.context is `{}` avoid unnecessary spread
      return context
    } else {
      return { ...req.context, ...context }
    }
  } else {
    return context
  }
}

const attachFakeURLProperties = (req: PayloadRequestWithData) => {
  /**
   * *NOTE*
   * If no URL is provided, the local API was called directly outside
   * the context of a request. Therefore we create a fake URL object.
   * `ts-ignore` is used below for properties that are 'read-only'
   * since they do not exist yet we can safely ignore the error.
   */
  let urlObject

  function getURLObject() {
    if (urlObject) return urlObject
    const urlToUse = req?.url || req.payload.config?.serverURL || 'http://localhost'
    try {
      urlObject = new URL(urlToUse)
    } catch (error) {
      urlObject = new URL('http://localhost')
    }

    return urlObject
  }

  if (!req.host) req.host = getURLObject().host
  if (!req.protocol) req.protocol = getURLObject().protocol
  if (!req.pathname) req.pathname = getURLObject().pathname
  // @ts-expect-error
  if (!req.searchParams) req.searchParams = getURLObject().searchParams
  // @ts-expect-error
  if (!req.origin) req.origin = getURLObject().origin
  // @ts-expect-error
  if (!req?.url) req.url = getURLObject().url
}

type CreateLocalReq = (
  options: {
    context?: RequestContext
    fallbackLocale?: string
    locale?: string
    req?: PayloadRequestWithData
    user?: User
  },
  payload: Payload,
) => Promise<PayloadRequestWithData>
export const createLocalReq: CreateLocalReq = async (
  { context, fallbackLocale, locale: localeArg, req = {} as PayloadRequestWithData, user },
  payload,
) => {
  const i18n = req?.i18n || (await getLocalI18n({ config: payload.config }))

  if (payload.config?.localization) {
    const locale = localeArg === '*' ? 'all' : localeArg
    const defaultLocale = payload.config.localization.defaultLocale
    req.locale = locale || req?.locale || defaultLocale
    const fallbackLocaleFromConfig = payload.config.localization.locales.find(
      ({ code }) => req.locale === code,
    )?.fallbackLocale
    if (typeof fallbackLocale !== 'undefined') {
      req.fallbackLocale = fallbackLocale
    } else if (typeof req?.fallbackLocale === 'undefined') {
      req.fallbackLocale = fallbackLocaleFromConfig || defaultLocale
    }
  }

  req.context = getRequestContext(req, context)
  req.payloadAPI = req?.payloadAPI || 'local'
  req.payload = payload
  req.i18n = i18n
  req.t = i18n.t
  req.user = user || req?.user || null
  req.payloadDataLoader = req?.payloadDataLoader || getDataLoader(req)
  req.routeParams = req?.routeParams || {}
  req.query = req?.query || {}

  attachFakeURLProperties(req)

  return req
}
