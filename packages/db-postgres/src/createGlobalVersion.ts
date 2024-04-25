import type { TypeWithVersion } from 'payload/database'
import type { PayloadRequestWithData, TypeWithID } from 'payload/types'

import { sql } from 'drizzle-orm'
import { type CreateGlobalVersionArgs } from 'payload/database'
import { buildVersionGlobalFields } from 'payload/versions'
import toSnakeCase from 'to-snake-case'

import type { PostgresAdapter } from './types.js'

import { upsertRow } from './upsertRow/index.js'

export async function createGlobalVersion<T extends TypeWithID>(
  this: PostgresAdapter,
  {
    autosave,
    globalSlug,
    req = {} as PayloadRequestWithData,
    versionData,
  }: CreateGlobalVersionArgs,
) {
  const db = this.sessions[req.transactionID]?.db || this.drizzle
  const global = this.payload.globals.config.find(({ slug }) => slug === globalSlug)

  const tableName = this.tableNameMap.get(`_${toSnakeCase(global.slug)}${this.versionsSuffix}`)

  const result = await upsertRow<TypeWithVersion<T>>({
    adapter: this,
    data: {
      autosave,
      latest: true,
      version: versionData,
    },
    db,
    fields: buildVersionGlobalFields(global),
    operation: 'create',
    req,
    tableName,
  })

  const table = this.tables[tableName]

  if (global.versions.drafts) {
    await db.execute(sql`
      UPDATE ${table}
      SET latest = false
      WHERE ${table.id} != ${result.id};
    `)
  }

  return result
}
