import type { TFunction } from '@payloadcms/translations';
import type { ClientCollectionConfig } from '../collections/config/client.js';
import type { ClientGlobalConfig } from '../globals/config/client.js';
import type { LivePreviewConfig, SanitizedConfig, ServerOnlyLivePreviewProperties } from './types.js';
export type ServerOnlyRootProperties = keyof Pick<SanitizedConfig, 'bin' | 'cors' | 'csrf' | 'custom' | 'db' | 'editor' | 'email' | 'endpoints' | 'graphQL' | 'hooks' | 'onInit' | 'plugins' | 'secret' | 'sharp' | 'typescript'>;
export type ServerOnlyRootAdminProperties = keyof Pick<SanitizedConfig['admin'], 'components'>;
export type ClientConfig = Omit<SanitizedConfig, 'admin' | 'collections' | 'globals' | ServerOnlyRootProperties> & {
    admin: Omit<SanitizedConfig['admin'], ServerOnlyRootAdminProperties & 'livePreview'> & {
        livePreview?: Omit<LivePreviewConfig, ServerOnlyLivePreviewProperties>;
    };
    collections: ClientCollectionConfig[];
    custom?: Record<string, any>;
    globals: ClientGlobalConfig[];
};
export declare const createClientConfig: ({ config, t, }: {
    config: SanitizedConfig;
    t: TFunction;
}) => Promise<ClientConfig>;
//# sourceMappingURL=client.d.ts.map