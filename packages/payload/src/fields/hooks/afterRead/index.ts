import type { SanitizedCollectionConfig } from '../../../collections/config/types.js'
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js'
import type { PayloadRequestWithData, RequestContext } from '../../../types/index.js'

import { deepCopyObject } from '../../../utilities/deepCopyObject.js'
import { traverseFields } from './traverseFields.js'

type Args = {
  collection: SanitizedCollectionConfig | null
  context: RequestContext
  currentDepth?: number
  depth: number
  doc: Record<string, unknown>
  fallbackLocale: null | string
  findMany?: boolean
  flattenLocales?: boolean
  global: SanitizedGlobalConfig | null
  locale: string
  overrideAccess: boolean
  req: PayloadRequestWithData
  showHiddenFields: boolean
}

/**
 * This function is responsible for the following actions, in order:
 * - Remove hidden fields from response
 * - Flatten locales into requested locale
 * - Sanitize outgoing data (point field, etc.)
 * - Execute field hooks
 * - Execute read access control
 * - Populate relationships
 */

export async function afterRead<T = any>(args: Args): Promise<T> {
  const {
    collection,
    context,
    currentDepth: incomingCurrentDepth,
    depth: incomingDepth,
    doc: incomingDoc,
    fallbackLocale,
    findMany,
    flattenLocales = true,
    global,
    locale,
    overrideAccess,
    req,
    showHiddenFields,
  } = args

  const doc = deepCopyObject(incomingDoc)
  const fieldPromises = []
  const populationPromises = []

  let depth =
    incomingDepth || incomingDepth === 0
      ? parseInt(String(incomingDepth), 10)
      : req.payload.config.defaultDepth
  if (depth > req.payload.config.maxDepth) depth = req.payload.config.maxDepth

  const currentDepth = incomingCurrentDepth || 1

  traverseFields({
    collection,
    context,
    currentDepth,
    depth,
    doc,
    fallbackLocale,
    fieldPromises,
    fields: collection?.fields || global?.fields,
    findMany,
    flattenLocales,
    global,
    locale,
    overrideAccess,
    populationPromises,
    req,
    showHiddenFields,
    siblingDoc: doc,
  })

  await Promise.all(fieldPromises)
  await Promise.all(populationPromises)

  return doc
}
