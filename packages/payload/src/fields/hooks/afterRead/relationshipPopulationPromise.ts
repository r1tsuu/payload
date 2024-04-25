import type { PayloadRequestWithData } from '../../../types/index.js'
import type { RelationshipField, UploadField } from '../../config/types.js'

import { fieldHasMaxDepth, fieldSupportsMany } from '../../config/types.js'

type PopulateArgs = {
  currentDepth: number
  data: Record<string, unknown>
  dataReference: Record<string, any>
  depth: number
  fallbackLocale: null | string
  field: RelationshipField | UploadField
  index?: number
  key?: string
  locale: null | string
  overrideAccess: boolean
  req: PayloadRequestWithData
  showHiddenFields: boolean
}

const populate = async ({
  currentDepth,
  data,
  dataReference,
  depth,
  fallbackLocale,
  field,
  index,
  key,
  locale,
  overrideAccess,
  req,
  showHiddenFields,
}: PopulateArgs) => {
  const dataToUpdate = dataReference
  const relation = Array.isArray(field.relationTo) ? (data.relationTo as string) : field.relationTo
  const relatedCollection = req.payload.collections[relation]

  if (relatedCollection) {
    let id = Array.isArray(field.relationTo) ? data.value : data
    let relationshipValue
    const shouldPopulate = depth && currentDepth <= depth

    if (
      typeof id !== 'string' &&
      typeof id !== 'number' &&
      typeof id?.toString === 'function' &&
      typeof id !== 'object'
    ) {
      id = id.toString()
    }

    if (shouldPopulate) {
      relationshipValue = await req.payloadDataLoader.load(
        JSON.stringify([
          req.transactionID,
          relatedCollection.config.slug,
          id,
          depth,
          currentDepth + 1,
          locale,
          fallbackLocale,
          overrideAccess,
          showHiddenFields,
        ]),
      )
    }

    if (!relationshipValue) {
      // ids are visible regardless of access controls
      relationshipValue = id
    }

    if (typeof index === 'number' && typeof key === 'string') {
      if (Array.isArray(field.relationTo)) {
        dataToUpdate[field.name][key][index].value = relationshipValue
      } else {
        dataToUpdate[field.name][key][index] = relationshipValue
      }
    } else if (typeof index === 'number' || typeof key === 'string') {
      if (Array.isArray(field.relationTo)) {
        dataToUpdate[field.name][index ?? key].value = relationshipValue
      } else {
        dataToUpdate[field.name][index ?? key] = relationshipValue
      }
    } else if (Array.isArray(field.relationTo)) {
      dataToUpdate[field.name].value = relationshipValue
    } else {
      dataToUpdate[field.name] = relationshipValue
    }
  }
}

type PromiseArgs = {
  currentDepth: number
  depth: number
  fallbackLocale: null | string
  field: RelationshipField | UploadField
  locale: null | string
  overrideAccess: boolean
  req: PayloadRequestWithData
  showHiddenFields: boolean
  siblingDoc: Record<string, any>
}

export const relationshipPopulationPromise = async ({
  currentDepth,
  depth,
  fallbackLocale,
  field,
  locale,
  overrideAccess,
  req,
  showHiddenFields,
  siblingDoc,
}: PromiseArgs): Promise<void> => {
  const resultingDoc = siblingDoc
  const populateDepth = fieldHasMaxDepth(field) && field.maxDepth < depth ? field.maxDepth : depth
  const rowPromises = []

  if (fieldSupportsMany(field) && field.hasMany) {
    if (
      locale === 'all' &&
      typeof siblingDoc[field.name] === 'object' &&
      siblingDoc[field.name] !== null
    ) {
      Object.keys(siblingDoc[field.name]).forEach((key) => {
        if (Array.isArray(siblingDoc[field.name][key])) {
          siblingDoc[field.name][key].forEach((relatedDoc, index) => {
            const rowPromise = async () => {
              await populate({
                currentDepth,
                data: siblingDoc[field.name][key][index],
                dataReference: resultingDoc,
                depth: populateDepth,
                fallbackLocale,
                field,
                index,
                key,
                locale,
                overrideAccess,
                req,
                showHiddenFields,
              })
            }
            rowPromises.push(rowPromise())
          })
        }
      })
    } else if (Array.isArray(siblingDoc[field.name])) {
      siblingDoc[field.name].forEach((relatedDoc, index) => {
        const rowPromise = async () => {
          if (relatedDoc) {
            await populate({
              currentDepth,
              data: relatedDoc,
              dataReference: resultingDoc,
              depth: populateDepth,
              fallbackLocale,
              field,
              index,
              locale,
              overrideAccess,
              req,
              showHiddenFields,
            })
          }
        }

        rowPromises.push(rowPromise())
      })
    }
  } else if (
    typeof siblingDoc[field.name] === 'object' &&
    siblingDoc[field.name] !== null &&
    locale === 'all'
  ) {
    Object.keys(siblingDoc[field.name]).forEach((key) => {
      const rowPromise = async () => {
        await populate({
          currentDepth,
          data: siblingDoc[field.name][key],
          dataReference: resultingDoc,
          depth: populateDepth,
          fallbackLocale,
          field,
          key,
          locale,
          overrideAccess,
          req,
          showHiddenFields,
        })
      }
      rowPromises.push(rowPromise())
    })

    await Promise.all(rowPromises)
  } else if (siblingDoc[field.name]) {
    await populate({
      currentDepth,
      data: siblingDoc[field.name],
      dataReference: resultingDoc,
      depth: populateDepth,
      fallbackLocale,
      field,
      locale,
      overrideAccess,
      req,
      showHiddenFields,
    })
  }
  await Promise.all(rowPromises)
}
