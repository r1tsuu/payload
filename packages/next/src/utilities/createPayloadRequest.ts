import type { CustomPayloadRequestProperties, PayloadRequest, SanitizedConfig } from 'payload/types'

import { initI18n } from '@payloadcms/translations'
import { executeAuthStrategies } from 'payload/auth'
import { parseCookies } from 'payload/auth'
import { getDataLoader } from 'payload/utilities'
import qs from 'qs'
import { URL } from 'url'

import { sanitizeLocales } from './addLocalesToRequest.js'
import { getPayloadHMR } from './getPayloadHMR.js'
import { getRequestLanguage } from './getRequestLanguage.js'

type Args = {
  config: Promise<SanitizedConfig> | SanitizedConfig
  params?: {
    collection: string
  }
  request: Request
}

export const createPayloadRequest = async ({
  config: configPromise,
  params,
  request,
}: Args): Promise<PayloadRequest> => {
  const cookies = parseCookies(request.headers)
  const payload = await getPayloadHMR({ config: configPromise })

  const { config } = payload

  const urlProperties = new URL(request.url)
  const { pathname, searchParams } = urlProperties

  const isGraphQL =
    !config.graphQL.disable && pathname === `${config.routes.api}${config.routes.graphQL}`

  const language = getRequestLanguage({
    config,
    cookies,
    headers: request.headers,
  })

  const i18n = await initI18n({
    config: config.i18n,
    context: 'api',
    language,
  })

  let locale
  let fallbackLocale
  if (config.localization) {
    const locales = sanitizeLocales({
      fallbackLocale: searchParams.get('fallback-locale'),
      locale: searchParams.get('locale'),
      localization: payload.config.localization,
    })
    locale = locales.locale
    fallbackLocale = locales.fallbackLocale
  }

  const customRequest: CustomPayloadRequestProperties = {
    context: {},
    fallbackLocale,
    hash: urlProperties.hash,
    host: urlProperties.host,
    href: urlProperties.href,
    i18n,
    locale,
    origin: urlProperties.origin,
    pathname: urlProperties.pathname,
    payload,
    payloadAPI: isGraphQL ? 'GraphQL' : 'REST',
    payloadDataLoader: undefined,
    payloadUploadSizes: {},
    port: urlProperties.port,
    protocol: urlProperties.protocol,
    query: urlProperties.search
      ? qs.parse(urlProperties.search, {
          arrayLimit: 1000,
          depth: 10,
          ignoreQueryPrefix: true,
        })
      : {},
    routeParams: params || {},
    search: urlProperties.search,
    searchParams: urlProperties.searchParams,
    t: i18n.t,
    transactionID: undefined,
    user: null,
  }

  const req: PayloadRequest = Object.assign(request, customRequest)

  req.payloadDataLoader = getDataLoader(req)

  req.user = await executeAuthStrategies({
    cookies,
    headers: req.headers,
    isGraphQL,
    payload,
  })

  return req
}
