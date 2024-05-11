import { randomBytes } from 'crypto'
import { sql } from 'drizzle-orm'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { devUser } from '../credentials.js'
import { PostsCollection } from './collections/Posts/index.js'
import { MenuGlobal } from './globals/Menu/index.js'

export const chunkArray = <T>(array: T[], length: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / length) }, (_, i) =>
    array.slice(i * length, i * length + length),
  )
}

const fields = [
  'title',
  'label',
  'author',
  'name',
  'link',
  'slug',
  'country',
  'city',
  'description',
]

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [
    PostsCollection,
    {
      slug: 'tests',
      fields: fields.map((name) => ({ name, type: 'text' })),
    },
  ],
  globals: [MenuGlobal],
  cors: ['http://localhost:3000', 'http://localhost:3001'],
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })

    const arr: string[] = Array(2000000).fill('_')

    const chunkSize = 5000

    const chunked = chunkArray(arr, chunkSize)

    for (const chunk of chunked) {
      const values = chunk.map(() => fields.map(() => randomBytes(20).toString('hex')))

      let query = `insert into tests (${fields.join(', ')}) values`

      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        query += `    (${value.map((each) => `'${each}'`).join(', ')})${i === values.length - 1 ? ';' : ',\n'}`
      }

      await payload.db.drizzle.execute(sql.raw(query))
    }
  },
})
