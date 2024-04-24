import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { getFileByPath } from 'payload/uploads'
import { fileURLToPath } from 'url'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { devUser } from '../credentials.js'
import { MediaCollection } from './collections/Media/index.js'
import { PostsCollection, postsSlug } from './collections/Posts/index.js'
import { MenuGlobal } from './globals/Menu/index.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [PostsCollection, MediaCollection],
  globals: [MenuGlobal],
  email: nodemailerAdapter(),
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })

    await payload.create({
      collection: postsSlug,
      data: {
        text: 'example post',
      },
    })

    const email = await payload.sendEmail({
      to: 'test@example.com',
      subject: 'This was sent on init',
    })

    // Create image
    const imageFilePath = path.resolve(dirname, '../uploads/image.png')
    const imageFile = await getFileByPath(imageFilePath)

    await payload.create({
      collection: 'media',
      data: {},
      file: imageFile,
    })
  },
})
