import type { PaginatedDocs } from '../../database/types.js'
import type { PayloadRequestWithData, Where } from '../../types/index.js'
import type { TypeWithVersion } from '../../versions/types.js'
import type { SanitizedGlobalConfig } from '../config/types.js'

import executeAccess from '../../auth/executeAccess.js'
import { combineQueries } from '../../database/combineQueries.js'
import { validateQueryPaths } from '../../database/queryValidation/validateQueryPaths.js'
import { afterRead } from '../../fields/hooks/afterRead/index.js'
import { commitTransaction } from '../../utilities/commitTransaction.js'
import { initTransaction } from '../../utilities/initTransaction.js'
import { killTransaction } from '../../utilities/killTransaction.js'
import sanitizeInternalFields from '../../utilities/sanitizeInternalFields.js'
import { buildVersionGlobalFields } from '../../versions/buildGlobalFields.js'

export type Arguments = {
  depth?: number
  globalConfig: SanitizedGlobalConfig
  limit?: number
  overrideAccess?: boolean
  page?: number
  req?: PayloadRequestWithData
  showHiddenFields?: boolean
  sort?: string
  where?: Where
}

export const findVersionsOperation = async <T extends TypeWithVersion<T>>(
  args: Arguments,
): Promise<PaginatedDocs<T>> => {
  const {
    depth,
    globalConfig,
    limit,
    overrideAccess,
    page,
    req: { fallbackLocale, locale, payload },
    req,
    showHiddenFields,
    sort,
    where,
  } = args

  const versionFields = buildVersionGlobalFields(globalConfig)

  try {
    const shouldCommit = await initTransaction(req)

    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////

    const accessResults = !overrideAccess
      ? await executeAccess({ req }, globalConfig.access.readVersions)
      : true

    await validateQueryPaths({
      globalConfig,
      overrideAccess,
      req,
      versionFields,
      where,
    })

    const fullWhere = combineQueries(where, accessResults)

    // /////////////////////////////////////
    // Find
    // /////////////////////////////////////

    const paginatedDocs = await payload.db.findGlobalVersions<T>({
      global: globalConfig.slug,
      limit: limit ?? 10,
      locale,
      page: page || 1,
      req,
      sort,
      where: fullWhere,
    })

    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////

    let result = {
      ...paginatedDocs,
      docs: await Promise.all(
        paginatedDocs.docs.map(async (data) => ({
          ...data,
          version: await afterRead({
            collection: null,
            context: req.context,
            depth,
            doc: {
              ...data.version,
              // Patch globalType onto version doc
              globalType: globalConfig.slug,
            },
            fallbackLocale,
            findMany: true,
            global: globalConfig,
            locale,
            overrideAccess,
            req,
            showHiddenFields,
          }),
        })),
      ),
    } as PaginatedDocs<T>

    // /////////////////////////////////////
    // afterRead - Global
    // /////////////////////////////////////

    result = {
      ...result,
      docs: await Promise.all(
        result.docs.map(async (doc) => {
          const docRef = doc

          await globalConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
            await priorHook

            docRef.version =
              (await hook({
                context: req.context,
                doc: doc.version,
                findMany: true,
                global: globalConfig,
                query: fullWhere,
                req,
              })) || doc.version
          }, Promise.resolve())

          return docRef
        }),
      ),
    }

    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////

    result = {
      ...result,
      docs: result.docs.map((doc) => sanitizeInternalFields<T>(doc)),
    }

    if (shouldCommit) await commitTransaction(req)

    return result
  } catch (error: unknown) {
    await killTransaction(req)
    throw error
  }
}
