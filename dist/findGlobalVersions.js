import { buildVersionGlobalFields } from 'payload';
import toSnakeCase from 'to-snake-case';
import { findMany } from './find/findMany.js';
export const findGlobalVersions = async function findGlobalVersions({ global, limit, locale, page, pagination, req = {}, skip, sort: sortArg, where }) {
    const globalConfig = this.payload.globals.config.find(({ slug })=>slug === global);
    const sort = typeof sortArg === 'string' ? sortArg : '-createdAt';
    const tableName = this.tableNameMap.get(`_${toSnakeCase(globalConfig.slug)}${this.versionsSuffix}`);
    const fields = buildVersionGlobalFields(globalConfig);
    return findMany({
        adapter: this,
        fields,
        limit,
        locale,
        page,
        pagination,
        req,
        skip,
        sort,
        tableName,
        where
    });
};

//# sourceMappingURL=findGlobalVersions.js.map