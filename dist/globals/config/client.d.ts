import type { TFunction } from '@payloadcms/translations';
import type { LivePreviewConfig, SanitizedConfig, ServerOnlyLivePreviewProperties } from '../../config/types.js';
import type { ClientFieldConfig } from '../../fields/config/client.js';
import type { SanitizedGlobalConfig } from './types.js';
export type ServerOnlyGlobalProperties = keyof Pick<SanitizedGlobalConfig, 'access' | 'admin' | 'custom' | 'endpoints' | 'fields' | 'hooks'>;
export type ServerOnlyGlobalAdminProperties = keyof Pick<SanitizedGlobalConfig['admin'], 'components' | 'hidden' | 'preview'>;
export type ClientGlobalConfig = Omit<SanitizedGlobalConfig, 'admin' | 'fields' | ServerOnlyGlobalProperties> & {
    admin: Omit<SanitizedGlobalConfig['admin'], ServerOnlyGlobalAdminProperties & 'fields' & 'livePreview'> & {
        livePreview?: Omit<LivePreviewConfig, ServerOnlyLivePreviewProperties>;
    };
    fields: ClientFieldConfig[];
};
export declare const createClientGlobalConfig: ({ global, t, }: {
    global: SanitizedConfig["globals"][0];
    t: TFunction;
}) => ClientGlobalConfig;
export declare const createClientGlobalConfigs: ({ globals, t, }: {
    globals: SanitizedConfig["globals"];
    t: TFunction;
}) => ClientGlobalConfig[];
//# sourceMappingURL=client.d.ts.map