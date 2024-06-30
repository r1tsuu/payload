/* eslint-disable no-param-reassign */ import { pgEnum, pgSchema, pgTable } from 'drizzle-orm/pg-core';
import { buildVersionCollectionFields, buildVersionGlobalFields } from 'payload';
import toSnakeCase from 'to-snake-case';
import { buildTable } from './schema/build.js';
import { createTableName } from './schema/createTableName.js';
export const init = function init() {
    if (this.schemaName) {
        this.pgSchema = pgSchema(this.schemaName);
    } else {
        this.pgSchema = {
            table: pgTable
        };
    }
    if (this.payload.config.localization) {
        this.enums.enum__locales = pgEnum('_locales', this.payload.config.localization.locales.map(({ code })=>code));
    }
    this.payload.config.collections.forEach((collection)=>{
        createTableName({
            adapter: this,
            config: collection
        });
        if (collection.versions) {
            createTableName({
                adapter: this,
                config: collection,
                versions: true,
                versionsCustomName: true
            });
        }
    });
    this.payload.config.collections.forEach((collection)=>{
        const tableName = this.tableNameMap.get(toSnakeCase(collection.slug));
        buildTable({
            adapter: this,
            disableNotNull: !!collection?.versions?.drafts,
            disableUnique: false,
            fields: collection.fields,
            tableName,
            timestamps: collection.timestamps,
            versions: false
        });
        if (collection.versions) {
            const versionsTableName = this.tableNameMap.get(`_${toSnakeCase(collection.slug)}${this.versionsSuffix}`);
            const versionFields = buildVersionCollectionFields(collection);
            buildTable({
                adapter: this,
                disableNotNull: !!collection.versions?.drafts,
                disableUnique: true,
                fields: versionFields,
                tableName: versionsTableName,
                timestamps: true,
                versions: true
            });
        }
    });
    this.payload.config.globals.forEach((global)=>{
        const tableName = createTableName({
            adapter: this,
            config: global
        });
        buildTable({
            adapter: this,
            disableNotNull: !!global?.versions?.drafts,
            disableUnique: false,
            fields: global.fields,
            tableName,
            timestamps: false,
            versions: false
        });
        if (global.versions) {
            const versionsTableName = createTableName({
                adapter: this,
                config: global,
                versions: true,
                versionsCustomName: true
            });
            const versionFields = buildVersionGlobalFields(global);
            buildTable({
                adapter: this,
                disableNotNull: !!global.versions?.drafts,
                disableUnique: true,
                fields: versionFields,
                tableName: versionsTableName,
                timestamps: true,
                versions: true
            });
        }
    });
};

//# sourceMappingURL=init.js.map