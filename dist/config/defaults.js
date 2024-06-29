export const defaults = {
    admin: {
        avatar: 'gravatar',
        components: {},
        custom: {},
        dateFormat: 'MMMM do yyyy, h:mm a',
        disable: false,
        meta: {
            defaultOGImageType: 'dynamic',
            titleSuffix: '- Payload'
        },
        routes: {
            account: '/account',
            createFirstUser: '/create-first-user',
            forgot: '/forgot',
            inactivity: '/logout-inactivity',
            login: '/login',
            logout: '/logout',
            reset: '/reset',
            unauthorized: '/unauthorized'
        }
    },
    bin: [],
    collections: [],
    cookiePrefix: 'payload',
    cors: [],
    csrf: [],
    custom: {},
    defaultDepth: 2,
    defaultMaxTextLength: 40000,
    endpoints: [],
    globals: [],
    graphQL: {
        disablePlaygroundInProduction: true,
        maxComplexity: 1000,
        schemaOutputFile: `${typeof process?.cwd === 'function' ? process.cwd() : ''}/schema.graphql`
    },
    hooks: {},
    i18n: {},
    localization: false,
    maxDepth: 10,
    routes: {
        admin: '/admin',
        api: '/api',
        graphQL: '/graphql',
        graphQLPlayground: '/graphql-playground'
    },
    serverURL: '',
    telemetry: true,
    typescript: {
        autoGenerate: true,
        definitions: {},
        outputFile: `${typeof process?.cwd === 'function' ? process.cwd() : ''}/payload-types.ts`
    },
    upload: {}
};

//# sourceMappingURL=defaults.js.map