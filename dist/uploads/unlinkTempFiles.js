import fs from 'fs';
import { promisify } from 'util';
import { mapAsync } from '../utilities/mapAsync.js';
const unlinkFile = promisify(fs.unlink);
/**
 * Cleanup temp files after operation lifecycle
 */ export const unlinkTempFiles = async ({ collectionConfig, config, req })=>{
    if (config.upload?.useTempFiles && collectionConfig.upload) {
        const { file } = req;
        const fileArray = [
            {
                file
            }
        ];
        await mapAsync(fileArray, async ({ file })=>{
            // Still need this check because this will not be populated if using local API
            if (file?.tempFilePath) {
                await unlinkFile(file.tempFilePath);
            }
        });
    }
};

//# sourceMappingURL=unlinkTempFiles.js.map