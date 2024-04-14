import type { LexicalBlock } from '@payloadcms/richtext-lexical'
import type { ArrayField } from 'payload/types'

import { BlocksFeature } from '@payloadcms/richtext-lexical'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { textFieldsSlug } from '../Text/shared.js'

export const BlockColumns = ({ name }: { name: string }): ArrayField => ({
  type: 'array',
  name,
  interfaceName: 'BlockColumns',
  admin: {
    initCollapsed: true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'subArray',
      type: 'array',
      fields: [
        {
          name: 'requiredText',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
})
export const ConditionalLayoutBlock: LexicalBlock = {
  fields: [
    {
      label: 'Layout',
      name: 'layout',
      type: 'select',
      options: ['1', '2', '3'],
      defaultValue: '1',
      required: true,
    },
    {
      ...BlockColumns({ name: 'columns' }),
      admin: {
        condition: (data, siblingData) => {
          return ['1'].includes(siblingData.layout)
        },
      },
      minRows: 1,
      maxRows: 1,
    },
    {
      ...BlockColumns({ name: 'columns2' }),
      admin: {
        condition: (data, siblingData) => {
          return ['2'].includes(siblingData.layout)
        },
      },
      minRows: 2,
      maxRows: 2,
    },
    {
      ...BlockColumns({ name: 'columns3' }),
      admin: {
        condition: (data, siblingData) => {
          return ['3'].includes(siblingData.layout)
        },
      },
      minRows: 3,
      maxRows: 3,
    },
  ],
  slug: 'conditionalLayout',
}

export const TextBlock: LexicalBlock = {
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
  ],
  slug: 'text',
}

export const RadioButtonsBlock: LexicalBlock = {
  interfaceName: 'LexicalBlocksRadioButtonsBlock',
  fields: [
    {
      name: 'radioButtons',
      type: 'radio',
      options: [
        {
          label: 'Option 1',
          value: 'option1',
        },
        {
          label: 'Option 2',
          value: 'option2',
        },
        {
          label: 'Option 3',
          value: 'option3',
        },
      ],
    },
  ],
  slug: 'radioButtons',
}

export const RichTextBlock: LexicalBlock = {
  fields: [
    {
      name: 'richTextField',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              {
                fields: [
                  {
                    name: 'subRichTextField',
                    type: 'richText',
                    editor: lexicalEditor({}),
                  },
                  {
                    name: 'subUploadField',
                    type: 'upload',
                    relationTo: 'uploads',
                  },
                ],
                slug: 'lexicalAndUploadBlock',
              },
            ],
          }),
        ],
      }),
    },
  ],
  slug: 'richTextBlock',
}

export const UploadAndRichTextBlock: LexicalBlock = {
  fields: [
    {
      name: 'upload',
      type: 'upload',
      relationTo: 'uploads',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor(),
    },
  ],
  slug: 'uploadAndRichText',
}

export const RelationshipHasManyBlock: LexicalBlock = {
  fields: [
    {
      name: 'rel',
      type: 'relationship',
      hasMany: true,
      relationTo: [textFieldsSlug, 'uploads'],
      required: true,
    },
  ],
  slug: 'relationshipHasManyBlock',
}
export const RelationshipBlock: LexicalBlock = {
  fields: [
    {
      name: 'rel',
      type: 'relationship',
      relationTo: 'uploads',
      required: true,
    },
  ],
  slug: 'relationshipBlock',
}

export const SelectFieldBlock: LexicalBlock = {
  fields: [
    {
      name: 'select',
      type: 'select',
      options: [
        {
          label: 'Option 1',
          value: 'option1',
        },
        {
          label: 'Option 2',
          value: 'option2',
        },
        {
          label: 'Option 3',
          value: 'option3',
        },
        {
          label: 'Option 4',
          value: 'option4',
        },
        {
          label: 'Option 5',
          value: 'option5',
        },
      ],
    },
  ],
  slug: 'select',
}

export const SubBlockBlock: LexicalBlock = {
  slug: 'subBlock',
  fields: [
    {
      name: 'subBlocks',
      type: 'blocks',
      blocks: [
        {
          slug: 'contentBlock',
          fields: [
            {
              name: 'richText',
              type: 'richText',
              required: true,
              editor: lexicalEditor(),
            },
          ],
        },
        {
          slug: 'textArea',
          fields: [
            {
              name: 'content',
              type: 'textarea',
              required: true,
            },
          ],
        },
        SelectFieldBlock,
      ],
    },
  ],
}
