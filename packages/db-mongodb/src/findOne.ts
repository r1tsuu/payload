import type { MongooseQueryOptions } from 'mongoose'
import type { FindOne } from 'payload/database'
import type { PayloadRequestWithData } from 'payload/types'
import type { Document } from 'payload/types'

import type { MongooseAdapter } from './index.js'

import sanitizeInternalFields from './utilities/sanitizeInternalFields.js'
import { withSession } from './withSession.js'

export const findOne: FindOne = async function findOne(
  this: MongooseAdapter,
  { collection, locale, req = {} as PayloadRequestWithData, where },
) {
  const Model = this.collections[collection]
  const options: MongooseQueryOptions = {
    ...withSession(this, req.transactionID),
    lean: true,
  }

  const query = await Model.buildQuery({
    locale,
    payload: this.payload,
    where,
  })

  const doc = await Model.findOne(query, {}, options)

  if (!doc) {
    return null
  }

  let result: Document = JSON.parse(JSON.stringify(doc))

  // custom id type reset
  result.id = result._id
  result = sanitizeInternalFields(result)

  return result
}
