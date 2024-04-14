'use client'
import type { ClientCollectionConfig, FieldAffectingData, Where } from 'payload/types'

import * as facelessUIImport from '@faceless-ui/window-info'
import { getTranslation } from '@payloadcms/translations'
import React, { useState } from 'react'
import AnimateHeightImport from 'react-animate-height'

const AnimateHeight = (AnimateHeightImport.default ||
  AnimateHeightImport) as typeof AnimateHeightImport.default

import { useUseTitleField } from '@payloadcms/ui/hooks/useUseAsTitle'

import type { FieldMap } from '../../utilities/buildComponentMap.js'

import { Chevron } from '../../icons/Chevron/index.js'
import { useListQuery } from '../../providers/ListQuery/index.js'
import { useSearchParams } from '../../providers/SearchParams/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { ColumnSelector } from '../ColumnSelector/index.js'
import { DeleteMany } from '../DeleteMany/index.js'
import { EditMany } from '../EditMany/index.js'
import { Pill } from '../Pill/index.js'
import { PublishMany } from '../PublishMany/index.js'
import { SearchFilter } from '../SearchFilter/index.js'
import { UnpublishMany } from '../UnpublishMany/index.js'
import { WhereBuilder } from '../WhereBuilder/index.js'
import validateWhereQuery from '../WhereBuilder/validateWhereQuery.js'
import { getTextFieldsToBeSearched } from './getTextFieldsToBeSearched.js'
import './index.scss'

const baseClass = 'list-controls'

export type ListControlsProps = {
  collectionConfig: ClientCollectionConfig
  enableColumns?: boolean
  enableSort?: boolean
  fieldMap: FieldMap
  handleSearchChange?: (search: string) => void
  handleSortChange?: (sort: string) => void
  handleWhereChange?: (where: Where) => void
}

/**
 * The ListControls component is used to render the controls (search, filter, where)
 * for a collection's list view. You can find those directly above the table which lists
 * the collection's documents.
 */
export const ListControls: React.FC<ListControlsProps> = (props) => {
  const { collectionConfig, enableColumns = true, enableSort = false, fieldMap } = props

  const { useWindowInfo } = facelessUIImport

  const { handleSearchChange } = useListQuery()
  const { searchParams } = useSearchParams()
  const titleField = useUseTitleField(collectionConfig, fieldMap)
  const { i18n, t } = useTranslation()
  const {
    breakpoints: { s: smallBreak },
  } = useWindowInfo()

  const shouldInitializeWhereOpened = validateWhereQuery(searchParams?.where)
  const [visibleDrawer, setVisibleDrawer] = useState<'columns' | 'sort' | 'where'>(
    shouldInitializeWhereOpened ? 'where' : undefined,
  )

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__wrap`}>
        <SearchFilter
          fieldLabel={
            (titleField &&
              getTranslation(
                'label' in titleField.fieldComponentProps &&
                  typeof titleField.fieldComponentProps.label === 'string'
                  ? titleField.fieldComponentProps.label
                  : titleField.name,
                i18n,
              )) ??
            undefined
          }
          fieldName={titleField?.name}
          handleChange={handleSearchChange}
          listSearchableFields={getTextFieldsToBeSearched(
            collectionConfig.admin.listSearchableFields,
            fieldMap,
          )}
        />
        <div className={`${baseClass}__buttons`}>
          <div className={`${baseClass}__buttons-wrap`}>
            {!smallBreak && (
              <React.Fragment>
                <EditMany collection={collectionConfig} fieldMap={fieldMap} />
                <PublishMany collection={collectionConfig} />
                <UnpublishMany collection={collectionConfig} />
                <DeleteMany collection={collectionConfig} />
              </React.Fragment>
            )}
            {enableColumns && (
              <Pill
                aria-controls={`${baseClass}-columns`}
                aria-expanded={visibleDrawer === 'columns'}
                className={`${baseClass}__toggle-columns ${
                  visibleDrawer === 'columns' ? `${baseClass}__buttons-active` : ''
                }`}
                icon={<Chevron />}
                onClick={() =>
                  setVisibleDrawer(visibleDrawer !== 'columns' ? 'columns' : undefined)
                }
                pillStyle="light"
              >
                {t('general:columns')}
              </Pill>
            )}
            <Pill
              aria-controls={`${baseClass}-where`}
              aria-expanded={visibleDrawer === 'where'}
              className={`${baseClass}__toggle-where ${
                visibleDrawer === 'where' ? `${baseClass}__buttons-active` : ''
              }`}
              icon={<Chevron />}
              onClick={() => setVisibleDrawer(visibleDrawer !== 'where' ? 'where' : undefined)}
              pillStyle="light"
            >
              {t('general:filters')}
            </Pill>
            {enableSort && (
              <Pill
                aria-controls={`${baseClass}-sort`}
                aria-expanded={visibleDrawer === 'sort'}
                className={`${baseClass}__toggle-sort`}
                icon={<Chevron />}
                onClick={() => setVisibleDrawer(visibleDrawer !== 'sort' ? 'sort' : undefined)}
                pillStyle="light"
              >
                {t('general:sort')}
              </Pill>
            )}
          </div>
        </div>
      </div>
      {enableColumns && (
        <AnimateHeight
          className={`${baseClass}__columns`}
          height={visibleDrawer === 'columns' ? 'auto' : 0}
          id={`${baseClass}-columns`}
        >
          <ColumnSelector collectionSlug={collectionConfig.slug} />
        </AnimateHeight>
      )}
      <AnimateHeight
        className={`${baseClass}__where`}
        height={visibleDrawer === 'where' ? 'auto' : 0}
        id={`${baseClass}-where`}
      >
        <WhereBuilder
          collectionPluralLabel={collectionConfig?.labels?.plural}
          collectionSlug={collectionConfig.slug}
        />
      </AnimateHeight>
      {enableSort && (
        <AnimateHeight
          className={`${baseClass}__sort`}
          height={visibleDrawer === 'sort' ? 'auto' : 0}
          id={`${baseClass}-sort`}
        >
          <p>Sort Complex</p>
          {/* <SortComplex
            collection={collection}
            handleChange={handleSortChange}
            modifySearchQuery={modifySearchQuery}
          /> */}
        </AnimateHeight>
      )}
    </div>
  )
}
