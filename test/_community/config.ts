import { buildConfigWithDefaults } from '../buildConfigWithDefaults'
import { devUser } from '../credentials'
import { Localized, localizedSlug } from './collections/Localized'
import { MediaCollection } from './collections/Media'
import { PostsCollection, postsSlug } from './collections/Posts'
import { MenuGlobal } from './globals/Menu'

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [
    PostsCollection,
    MediaCollection,
    Localized,
    // ...add more collections here
  ],
  localization: {
    locales: ['de', 'en'],
    defaultLocale: 'en',
  },
  globals: [
    MenuGlobal,
    // ...add more globals here
  ],
  graphQL: {
    schemaOutputFile: './test/_community/schema.graphql',
  },

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
  },
})
