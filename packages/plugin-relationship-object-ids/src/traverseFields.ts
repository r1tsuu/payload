import type { Config } from 'payload/config'
import type { Field } from 'payload/types'

import { getBeforeChangeHook } from './hooks/beforeChange.js'

export const traverseFields = ({
  config,
  fields,
}: {
  config: Config
  fields: Field[]
}): Field[] => {
  return fields.map((field) => {
    if (field.type === 'relationship' || field.type === 'upload') {
      return {
        ...field,
        hooks: {
          ...(field.hooks || {}),
          beforeChange: [
            ...(field.hooks?.beforeChange || []),
            getBeforeChangeHook({ config, field }),
          ],
        },
      }
    }

    if ('fields' in field) {
      return {
        ...field,
        fields: traverseFields({ config, fields: field.fields }),
      }
    }

    if (field.type === 'tabs') {
      return {
        ...field,
        tabs: field.tabs.map((tab) => {
          return {
            ...tab,
            fields: traverseFields({ config, fields: tab.fields }),
          }
        }),
      }
    }

    if (field.type === 'blocks') {
      return {
        ...field,
        blocks: field.blocks.map((block) => {
          return {
            ...block,
            fields: traverseFields({ config, fields: block.fields }),
          }
        }),
      }
    }

    return field
  })
}
