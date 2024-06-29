import pinoImport from 'pino';
import pinoPrettyImport from 'pino-pretty';
const pino = pinoImport.default || pinoImport;
const pinoPretty = pinoPrettyImport.default || pinoPrettyImport;
const prettyOptions = {
    colorize: true,
    ignore: 'pid,hostname',
    translateTime: 'SYS:HH:MM:ss'
};
export const defaultLoggerOptions = {
    transport: {
        options: prettyOptions,
        target: 'pino-pretty'
    }
};
export const prettySyncLoggerDestination = pinoPretty({
    ...prettyOptions,
    destination: 1,
    sync: true
});
const getLogger = (name = 'payload', options, destination)=>{
    if (options) {
        return pino({
            name: options?.name || name,
            enabled: process.env.DISABLE_LOGGING !== 'true',
            ...options || defaultLoggerOptions
        }, destination);
    }
    return pino(prettySyncLoggerDestination);
};
export default getLogger;

//# sourceMappingURL=logger.js.map