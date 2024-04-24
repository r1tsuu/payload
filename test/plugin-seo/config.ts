import { seo } from '@payloadcms/plugin-seo'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { devUser } from '../credentials.js'
import { Media } from './collections/Media.js'
import { Pages } from './collections/Pages.js'
import { Users } from './collections/Users.js'
import { seed } from './seed/index.js'

export default buildConfigWithDefaults({
  collections: [Users, Pages, Media],
  i18n: {
    supportedLanguages: {
      en,
      es,
    },
    translations: {
      es: {
        'plugin-seo': {
          autoGenerate: 'Auto-génerar',
        },
      },
    },
  },
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: ['en', 'es', 'de'],
  },
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })

    await seed(payload)
  },
  plugins: [
    seo({
      collections: ['pages'],
      fieldOverrides: {
        title: {
          required: true,
        },
      },
      fields: [
        {
          name: 'ogTitle',
          type: 'text',
          label: 'og:title',
        },
      ],
      generateDescription: ({ doc }: any) => doc?.excerpt?.value || 'generated description',
      generateDescriptionAi: ({ doc }: any) => {
        const value = doc?.excerpt?.value || 'generated description'
        return `Generate me SEO meta description with this content - ${value} `
      },
      generateTitle: (data: any) => `Website.com — ${data?.doc?.title?.value}`,
      generateTitleAi: (data: any) => {
        return `Generate me SEO meta title with this content - Website.com — ${data?.doc?.title?.value}`
      },
      generateURL: ({ doc, locale }: any) =>
        `https://yoursite.com/${locale ? locale + '/' : ''}${doc?.slug?.value || ''}`,
      openaiApiKey: 'some key',
      tabbedUI: true,
      uploadsCollection: 'media',
    }),
  ],
})
