'use client'

import type { FormFieldBase } from '@payloadcms/ui/fields/shared'
import type { ClientValidate, FieldBase } from 'payload/types'
import type { BaseEditor, BaseOperation } from 'slate'
import type { HistoryEditor } from 'slate-history'
import type { ReactEditor } from 'slate-react'

import { getTranslation } from '@payloadcms/translations'
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription'
import { FieldError } from '@payloadcms/ui/forms/FieldError'
import { FieldLabel } from '@payloadcms/ui/forms/FieldLabel'
import { useFieldProps } from '@payloadcms/ui/forms/FieldPropsProvider'
import { useField } from '@payloadcms/ui/forms/useField'
import { withCondition } from '@payloadcms/ui/forms/withCondition'
import { useEditDepth } from '@payloadcms/ui/providers/EditDepth'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import isHotkey from 'is-hotkey'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Node, Element as SlateElement, Text, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'

import type { ElementNode, RichTextPlugin, TextNode } from '../types.js'
import type { EnabledFeatures } from './types.js'

import { defaultRichTextValue } from '../data/defaultValue.js'
import { richTextValidate } from '../data/validation.js'
import { listTypes } from './elements/listTypes.js'
import { hotkeys } from './hotkeys.js'
import './index.scss'
import { toggleLeaf } from './leaves/toggle.js'
import { withEnterBreakOut } from './plugins/withEnterBreakOut.js'
import { withHTML } from './plugins/withHTML.js'
import { ElementButtonProvider } from './providers/ElementButtonProvider.js'
import { ElementProvider } from './providers/ElementProvider.js'
import { LeafButtonProvider } from './providers/LeafButtonProvider.js'
import { LeafProvider } from './providers/LeafProvider.js'

const baseClass = 'rich-text'

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: ElementNode
    Text: TextNode
  }
}

const RichTextField: React.FC<
  FormFieldBase & {
    elements: EnabledFeatures['elements']
    label?: FieldBase['label']
    leaves: EnabledFeatures['leaves']
    name: string
    placeholder?: string
    plugins: RichTextPlugin[]
    richTextComponentMap: Map<string, React.ReactNode>
    width?: string
  }
> = (props) => {
  const {
    name,
    CustomDescription,
    CustomError,
    CustomLabel,
    className,
    descriptionProps,
    elements,
    errorProps,
    label,
    labelProps,
    leaves,
    path: pathFromProps,
    placeholder,
    plugins,
    readOnly,
    required,
    style,
    validate = richTextValidate,
    width,
  } = props

  const { i18n } = useTranslation()
  const editorRef = useRef(null)
  const toolbarRef = useRef(null)

  const drawerDepth = useEditDepth()
  const drawerIsOpen = drawerDepth > 1

  const memoizedValidate: ClientValidate = useCallback(
    (value, validationOptions) => {
      if (typeof validate === 'function') {
        return validate(value, {
          ...validationOptions,
          req: {
            t: i18n.t,
          },
          required,
        })
      }
    },
    [validate, required, i18n],
  )

  const { path: pathFromContext } = useFieldProps()

  const { initialValue, path, schemaPath, setValue, showError, value } = useField({
    path: pathFromContext || pathFromProps || name,
    validate: memoizedValidate,
  })

  const editor = useMemo(() => {
    let CreatedEditor = withEnterBreakOut(withHistory(withReact(createEditor())))

    CreatedEditor = withHTML(CreatedEditor)

    if (plugins.length) {
      CreatedEditor = plugins.reduce((editorWithPlugins, plugin) => {
        return plugin(editorWithPlugins)
      }, CreatedEditor)
    }

    return CreatedEditor
  }, [plugins])

  const renderElement = useCallback(
    ({ attributes, children, element }) => {
      // return <div {...attributes}>{children}</div>

      const matchedElement = elements[element.type]
      const Element = matchedElement?.Element

      let attr = { ...attributes }

      // this converts text alignment to margin when dealing with void elements
      if (element.textAlign) {
        if (element.type === 'relationship' || element.type === 'upload') {
          switch (element.textAlign) {
            case 'left':
              attr = { ...attr, style: { marginRight: 'auto' } }
              break
            case 'right':
              attr = { ...attr, style: { marginLeft: 'auto' } }
              break
            case 'center':
              attr = { ...attr, style: { marginLeft: 'auto', marginRight: 'auto' } }
              break
            default:
              attr = { ...attr, style: { textAlign: element.textAlign } }
              break
          }
        } else if (element.type === 'li') {
          switch (element.textAlign) {
            case 'right':
              attr = { ...attr, style: { listStylePosition: 'inside', textAlign: 'right' } }
              break
            case 'center':
              attr = { ...attr, style: { listStylePosition: 'inside', textAlign: 'center' } }
              break
            case 'left':
            default:
              attr = { ...attr, style: { listStylePosition: 'outside', textAlign: 'left' } }
              break
          }
        } else {
          attr = { ...attr, style: { textAlign: element.textAlign } }
        }
      }

      if (Element) {
        const el = (
          <ElementProvider
            attributes={attr}
            childNodes={children}
            editorRef={editorRef}
            element={element}
            fieldProps={props}
            path={path}
            schemaPath={schemaPath}
          >
            {Element}
          </ElementProvider>
        )

        return el
      }

      return <div {...attr}>{children}</div>
    },
    [elements, path, props, schemaPath],
  )

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }) => {
      const matchedLeaves = Object.entries(leaves).filter(([leafName]) => leaf[leafName])

      if (matchedLeaves.length > 0) {
        return matchedLeaves.reduce(
          (result, [, leafConfig], i) => {
            if (leafConfig?.Leaf) {
              const Leaf = leafConfig.Leaf

              return (
                <LeafProvider
                  attributes={attributes}
                  editorRef={editorRef}
                  fieldProps={props}
                  key={i}
                  leaf={leaf}
                  path={path}
                  result={result}
                  schemaPath={schemaPath}
                >
                  {Leaf}
                </LeafProvider>
              )
            }

            return result
          },
          <span {...attributes}>{children}</span>,
        )
      }

      return <span {...attributes}>{children}</span>
    },
    [path, props, schemaPath, leaves],
  )

  // All slate changes fire the onChange event
  // including selection changes
  // so we will filter the set_selection operations out
  // and only fire setValue when onChange is because of value
  const handleChange = useCallback(
    (val: unknown) => {
      const ops = editor?.operations.filter((o: BaseOperation) => {
        if (o) {
          return o.type !== 'set_selection'
        }
        return false
      })

      if (ops && Array.isArray(ops) && ops.length > 0) {
        if (!readOnly && val !== defaultRichTextValue && val !== value) {
          setValue(val)
        }
      }
    },
    [editor?.operations, readOnly, setValue, value],
  )

  useEffect(() => {
    function setClickableState(clickState: 'disabled' | 'enabled') {
      const selectors = 'button, a, [role="button"]'
      const toolbarButtons: (HTMLAnchorElement | HTMLButtonElement)[] =
        toolbarRef.current?.querySelectorAll(selectors)

      ;(toolbarButtons || []).forEach((child) => {
        const isButton = child.tagName === 'BUTTON'
        const isDisabling = clickState === 'disabled'
        child.setAttribute('tabIndex', isDisabling ? '-1' : '0')
        if (isButton) child.setAttribute('disabled', isDisabling ? 'disabled' : null)
      })
    }

    if (readOnly) {
      setClickableState('disabled')
    }

    return () => {
      if (readOnly) {
        setClickableState('enabled')
      }
    }
  }, [readOnly])

  // useEffect(() => {
  //   // If there is a change to the initial value, we need to reset Slate history
  //   // and clear selection because the old selection may no longer be valid
  //   // as returned JSON may be modified in hooks and have a different shape
  //   if (editor.selection) {
  //     console.log('deselecting');
  //     ReactEditor.deselect(editor);
  //   }
  // }, [path, editor]);

  const classes = [
    baseClass,
    'field-type',
    className,
    showError && 'error',
    readOnly && `${baseClass}--read-only`,
  ]
    .filter(Boolean)
    .join(' ')

  let valueToRender = value

  if (typeof valueToRender === 'string') {
    try {
      const parsedJSON = JSON.parse(valueToRender)
      valueToRender = parsedJSON
    } catch (err) {
      valueToRender = null
    }
  }

  if (!valueToRender) valueToRender = defaultRichTextValue

  return (
    <div
      className={classes}
      style={{
        ...style,
        width,
      }}
    >
      <div className={`${baseClass}__wrap`}>
        <FieldError CustomError={CustomError} path={path} {...(errorProps || {})} />
        <FieldLabel
          CustomLabel={CustomLabel}
          label={label}
          required={required}
          {...(labelProps || {})}
        />
        <Slate
          editor={editor}
          key={JSON.stringify({ initialValue, path })} // makes sure slate is completely re-rendered when initialValue changes, bypassing the slate-internal value memoization. That way, external changes to the form will update the editor
          onChange={handleChange}
          value={valueToRender as any[]}
        >
          <div className={`${baseClass}__wrapper`}>
            {Object.keys(elements)?.length + Object.keys(leaves)?.length > 0 && (
              <div
                className={[`${baseClass}__toolbar`, drawerIsOpen && `${baseClass}__drawerIsOpen`]
                  .filter(Boolean)
                  .join(' ')}
                ref={toolbarRef}
              >
                <div className={`${baseClass}__toolbar-wrap`}>
                  {Object.values(elements).map((element) => {
                    const Button = element?.Button

                    if (Button) {
                      return (
                        <ElementButtonProvider
                          fieldProps={props}
                          key={element.name}
                          path={path}
                          schemaPath={schemaPath}
                        >
                          {Button}
                        </ElementButtonProvider>
                      )
                    }

                    return null
                  })}
                  {Object.values(leaves).map((leaf) => {
                    const Button = leaf?.Button

                    if (Button) {
                      return (
                        <LeafButtonProvider
                          fieldProps={props}
                          key={leaf.name}
                          path={path}
                          schemaPath={schemaPath}
                        >
                          {Button}
                        </LeafButtonProvider>
                      )
                    }

                    return null
                  })}
                </div>
              </div>
            )}
            <div className={`${baseClass}__editor`} ref={editorRef}>
              <Editable
                className={`${baseClass}__input`}
                id={`field-${path.replace(/\./g, '__')}`}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    if (event.shiftKey) {
                      event.preventDefault()
                      editor.insertText('\n')
                    } else {
                      const selectedElement = Node.descendant(
                        editor,
                        editor.selection.anchor.path.slice(0, -1),
                      )

                      if (SlateElement.isElement(selectedElement)) {
                        // Allow hard enter to "break out" of certain elements
                        if (editor.shouldBreakOutOnEnter(selectedElement)) {
                          event.preventDefault()
                          const selectedLeaf = Node.descendant(editor, editor.selection.anchor.path)

                          if (
                            Text.isText(selectedLeaf) &&
                            String(selectedLeaf.text).length === editor.selection.anchor.offset
                          ) {
                            Transforms.insertNodes(editor, { children: [{ text: '' }] })
                          } else {
                            Transforms.splitNodes(editor)
                            Transforms.setNodes(editor, {})
                          }
                        }
                      }
                    }
                  }

                  if (event.key === 'Backspace') {
                    const selectedElement = Node.descendant(
                      editor,
                      editor.selection.anchor.path.slice(0, -1),
                    )

                    if (SlateElement.isElement(selectedElement) && selectedElement.type === 'li') {
                      const selectedLeaf = Node.descendant(editor, editor.selection.anchor.path)
                      if (Text.isText(selectedLeaf) && String(selectedLeaf.text).length === 0) {
                        event.preventDefault()
                        Transforms.unwrapNodes(editor, {
                          match: (n) => SlateElement.isElement(n) && listTypes.includes(n.type),
                          mode: 'lowest',
                          split: true,
                        })

                        Transforms.setNodes(editor, { type: undefined })
                      }
                    } else if (editor.isVoid(selectedElement)) {
                      Transforms.removeNodes(editor)
                    }
                  }

                  Object.keys(hotkeys).forEach((hotkey) => {
                    if (isHotkey(hotkey, event as any)) {
                      event.preventDefault()
                      const mark = hotkeys[hotkey]
                      toggleLeaf(editor, mark)
                    }
                  })
                }}
                placeholder={getTranslation(placeholder, i18n)}
                readOnly={readOnly}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                spellCheck
              />
            </div>
          </div>
        </Slate>
        {CustomDescription !== undefined ? (
          CustomDescription
        ) : (
          <FieldDescription {...(descriptionProps || {})} />
        )}
      </div>
    </div>
  )
}

export const RichText = withCondition(RichTextField)
