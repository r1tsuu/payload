import type { MarkOptional } from 'ts-essentials'

import crypto from 'crypto'

import type { GeneratedTypes } from '../../index.js'
import type { Document, PayloadRequest } from '../../types/index.js'
import type {
  AfterChangeHook,
  BeforeOperationHook,
  BeforeValidateHook,
  Collection,
} from '../config/types.js'

import executeAccess from '../../auth/executeAccess.js'
import { sendVerificationEmail } from '../../auth/sendVerificationEmail.js'
import { registerLocalStrategy } from '../../auth/strategies/local/register.js'
import { afterChange } from '../../fields/hooks/afterChange/index.js'
import { afterRead } from '../../fields/hooks/afterRead/index.js'
import { beforeChange } from '../../fields/hooks/beforeChange/index.js'
import { beforeValidate } from '../../fields/hooks/beforeValidate/index.js'
import { generateFileData } from '../../uploads/generateFileData.js'
import { unlinkTempFiles } from '../../uploads/unlinkTempFiles.js'
import { uploadFiles } from '../../uploads/uploadFiles.js'
import { commitTransaction } from '../../utilities/commitTransaction.js'
import { initTransaction } from '../../utilities/initTransaction.js'
import { killTransaction } from '../../utilities/killTransaction.js'
import sanitizeInternalFields from '../../utilities/sanitizeInternalFields.js'
import { saveVersion } from '../../versions/saveVersion.js'
import { buildAfterOperation } from './utils.js'

export type CreateUpdateType = { [field: number | string | symbol]: unknown }

export type Arguments<T extends CreateUpdateType> = {
  autosave?: boolean
  collection: Collection
  data: MarkOptional<T, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>
  depth?: number
  disableVerificationEmail?: boolean
  draft?: boolean
  overrideAccess?: boolean
  overwriteExistingFiles?: boolean
  req: PayloadRequest
  showHiddenFields?: boolean
}

export const createOperation = async <TSlug extends keyof GeneratedTypes['collections']>(
  incomingArgs: Arguments<GeneratedTypes['collections'][TSlug]>,
): Promise<GeneratedTypes['collections'][TSlug]> => {
  let args = incomingArgs

  try {
    const shouldCommit = await initTransaction(args.req)

    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////

    await args.collection.config.hooks.beforeOperation.reduce(
      async (priorHook: BeforeOperationHook | Promise<void>, hook: BeforeOperationHook) => {
        await priorHook

        args =
          (await hook({
            args,
            collection: args.collection.config,
            context: args.req.context,
            operation: 'create',
            req: args.req,
          })) || args
      },
      Promise.resolve(),
    )

    const {
      autosave = false,
      collection: { config: collectionConfig },
      collection,
      depth,
      disableVerificationEmail,
      draft = false,
      overrideAccess,
      overwriteExistingFiles = false,
      req: {
        fallbackLocale,
        locale,
        payload,
        payload: { config, email },
      },
      req,
      showHiddenFields,
    } = args

    let { data } = args

    const shouldSaveDraft = Boolean(draft && collectionConfig.versions.drafts)

    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////

    if (!overrideAccess) {
      await executeAccess({ data, req }, collectionConfig.access.create)
    }

    // /////////////////////////////////////
    // Custom id
    // /////////////////////////////////////

    if (payload.collections[collectionConfig.slug].customIDType) {
      data = {
        _id: data.id,
        ...data,
      }
    }

    // /////////////////////////////////////
    // Generate data for all files and sizes
    // /////////////////////////////////////

    const { data: newFileData, files: filesToUpload } = await generateFileData({
      collection,
      config,
      data,
      overwriteExistingFiles,
      req,
      throwOnMissingFile:
        !shouldSaveDraft && collection.config.upload.filesRequiredOnCreate !== false,
    })

    data = newFileData

    // /////////////////////////////////////
    // beforeValidate - Fields
    // /////////////////////////////////////

    data = await beforeValidate({
      collection: collectionConfig,
      context: req.context,
      data,
      doc: {},
      global: null,
      operation: 'create',
      overrideAccess,
      req,
    })

    // /////////////////////////////////////
    // beforeValidate - Collections
    // /////////////////////////////////////

    await collectionConfig.hooks.beforeValidate.reduce(
      async (priorHook: BeforeValidateHook | Promise<void>, hook: BeforeValidateHook) => {
        await priorHook

        data =
          (await hook({
            collection: collectionConfig,
            context: req.context,
            data,
            operation: 'create',
            req,
          })) || data
      },
      Promise.resolve(),
    )

    // /////////////////////////////////////
    // Write files to local storage
    // /////////////////////////////////////

    // if (!collectionConfig.upload.disableLocalStorage) {
    //   await uploadFiles(payload, filesToUpload, req.t)
    // }

    // /////////////////////////////////////
    // beforeChange - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.beforeChange.reduce(async (priorHook, hook) => {
      await priorHook

      data =
        (await hook({
          collection: collectionConfig,
          context: req.context,
          data,
          operation: 'create',
          req,
        })) || data
    }, Promise.resolve())

    // /////////////////////////////////////
    // beforeChange - Fields
    // /////////////////////////////////////

    const resultWithLocales = await beforeChange<Record<string, unknown>>({
      collection: collectionConfig,
      context: req.context,
      data,
      doc: {},
      docWithLocales: {},
      global: null,
      operation: 'create',
      req,
      skipValidation: shouldSaveDraft,
    })

    // /////////////////////////////////////
    // Write files to local storage
    // /////////////////////////////////////

    if (!collectionConfig.upload.disableLocalStorage) {
      await uploadFiles(payload, filesToUpload, req)
    }

    // /////////////////////////////////////
    // Create
    // /////////////////////////////////////

    let doc

    if (collectionConfig.auth && !collectionConfig.auth.disableLocalStrategy) {
      if (data.email) {
        resultWithLocales.email = (data.email as string).toLowerCase()
      }

      if (collectionConfig.auth.verify) {
        resultWithLocales._verified = Boolean(resultWithLocales._verified) || false
        resultWithLocales._verificationToken = crypto.randomBytes(20).toString('hex')
      }

      doc = await registerLocalStrategy({
        collection: collectionConfig,
        doc: resultWithLocales,
        password: data.password as string,
        payload: req.payload,
        req,
      })
    } else {
      doc = await payload.db.create({
        collection: collectionConfig.slug,
        data: resultWithLocales,
        req,
      })
    }

    const verificationToken = doc._verificationToken
    let result: Document = sanitizeInternalFields(doc)

    // /////////////////////////////////////
    // Create version
    // /////////////////////////////////////

    if (collectionConfig.versions) {
      await saveVersion({
        id: result.id,
        autosave,
        collection: collectionConfig,
        docWithLocales: result,
        payload,
        req,
      })
    }

    // /////////////////////////////////////
    // Send verification email if applicable
    // /////////////////////////////////////

    if (collectionConfig.auth && collectionConfig.auth.verify) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      sendVerificationEmail({
        collection: { config: collectionConfig },
        config: payload.config,
        disableEmail: disableVerificationEmail,
        email: payload.email,
        req,
        token: verificationToken,
        user: result,
      })
    }

    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////

    result = await afterRead({
      collection: collectionConfig,
      context: req.context,
      depth,
      doc: result,
      fallbackLocale,
      global: null,
      locale,
      overrideAccess,
      req,
      showHiddenFields,
    })

    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
      await priorHook

      result =
        (await hook({
          collection: collectionConfig,
          context: req.context,
          doc: result,
          req,
        })) || result
    }, Promise.resolve())

    // /////////////////////////////////////
    // afterChange - Fields
    // /////////////////////////////////////

    result = await afterChange({
      collection: collectionConfig,
      context: req.context,
      data,
      doc: result,
      global: null,
      operation: 'create',
      previousDoc: {},
      req,
    })

    // /////////////////////////////////////
    // afterChange - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterChange.reduce(
      async (priorHook: AfterChangeHook | Promise<void>, hook: AfterChangeHook) => {
        await priorHook

        result =
          (await hook({
            collection: collectionConfig,
            context: req.context,
            doc: result,
            operation: 'create',
            previousDoc: {},
            req: args.req,
          })) || result
      },
      Promise.resolve(),
    )

    // /////////////////////////////////////
    // afterOperation - Collection
    // /////////////////////////////////////

    result = await buildAfterOperation<GeneratedTypes['collections'][TSlug]>({
      args,
      collection: collectionConfig,
      operation: 'create',
      result,
    })

    await unlinkTempFiles({ collectionConfig, config, req })

    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////

    if (shouldCommit) await commitTransaction(req)

    return result
  } catch (error: unknown) {
    await killTransaction(args.req)
    throw error
  }
}
