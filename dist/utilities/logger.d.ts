import pinoImport from 'pino';
import pinoPrettyImport from 'pino-pretty';
export type PayloadLogger = pinoImport.default.Logger;
export declare const defaultLoggerOptions: pinoImport.default.LoggerOptions;
export declare const prettySyncLoggerDestination: pinoPrettyImport.PinoPretty.PrettyStream;
declare const getLogger: (name?: string, options?: pinoImport.default.LoggerOptions, destination?: pinoImport.default.DestinationStream) => PayloadLogger;
export default getLogger;
//# sourceMappingURL=logger.d.ts.map