import type { CollectionConfig } from 'payload/types'

export const localizedSlug = 'localized '

export const Localized: CollectionConfig = {
  slug: localizedSlug,
  fields: [
    {
      name: 'groupLocalized',
      localized: true,
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
      ],
    },
    {
      name: 'group',
      type: 'group',
      fields: [
        {
          localized: true,
          name: 'title',
          type: 'text',
        },
      ],
    },
  ],
}
