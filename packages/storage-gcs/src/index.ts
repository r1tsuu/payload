import type { StorageOptions } from '@google-cloud/storage'
import type {
  Adapter,
  PluginOptions as CloudStoragePluginOptions,
  CollectionOptions,
  GeneratedAdapter,
} from '@payloadcms/plugin-cloud-storage/types'
import type { Config, Plugin } from 'payload/config'

import { Storage } from '@google-cloud/storage'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'

import { getGenerateURL } from './generateURL.js'
import { getHandleDelete } from './handleDelete.js'
import { getHandleUpload } from './handleUpload.js'
import { getHandler } from './staticHandler.js'

export interface GcsStorageOptions {
  acl?: 'Private' | 'Public'

  /**
   * The name of the bucket to use.
   */
  bucket: string
  /**
   * Collection options to apply the S3 adapter to.
   */
  collections: Record<string, Omit<CollectionOptions, 'adapter'> | true>
  /**
   * Whether or not to enable the plugin
   *
   * Default: true
   */
  enabled?: boolean

  /**
   * Google Cloud Storage client configuration.
   *
   * @see https://github.com/googleapis/nodejs-storage
   */
  options: StorageOptions
}

type GcsStoragePlugin = (gcsStorageArgs: GcsStorageOptions) => Plugin

export const gcsStorage: GcsStoragePlugin =
  (gcsStorageOptions: GcsStorageOptions) =>
  (incomingConfig: Config): Config => {
    if (gcsStorageOptions.enabled === false) {
      return incomingConfig
    }

    const adapter = gcsStorageInternal(gcsStorageOptions)

    // Add adapter to each collection option object
    const collectionsWithAdapter: CloudStoragePluginOptions['collections'] = Object.entries(
      gcsStorageOptions.collections,
    ).reduce(
      (acc, [slug, collOptions]) => ({
        ...acc,
        [slug]: {
          ...(collOptions === true ? {} : collOptions),
          adapter,
        },
      }),
      {} as Record<string, CollectionOptions>,
    )

    // Set disableLocalStorage: true for collections specified in the plugin options
    const config = {
      ...incomingConfig,
      collections: (incomingConfig.collections || []).map((collection) => {
        if (!collectionsWithAdapter[collection.slug]) {
          return collection
        }

        return {
          ...collection,
          upload: {
            ...(typeof collection.upload === 'object' ? collection.upload : {}),
            disableLocalStorage: true,
          },
        }
      }),
    }

    return cloudStorage({
      collections: collectionsWithAdapter,
    })(config)
  }

function gcsStorageInternal({ acl, bucket, options }: GcsStorageOptions): Adapter {
  return ({ collection, prefix }): GeneratedAdapter => {
    let storageClient: Storage | null = null

    const getStorageClient = (): Storage => {
      if (storageClient) return storageClient
      storageClient = new Storage(options)
      return storageClient
    }

    return {
      generateURL: getGenerateURL({ bucket, getStorageClient }),
      handleDelete: getHandleDelete({ bucket, getStorageClient }),
      handleUpload: getHandleUpload({
        acl,
        bucket,
        collection,
        getStorageClient,
        prefix,
      }),
      staticHandler: getHandler({ bucket, collection, getStorageClient }),
    }
  }
}
