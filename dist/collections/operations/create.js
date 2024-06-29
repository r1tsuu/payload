import crypto from 'crypto';
import executeAccess from '../../auth/executeAccess.js';
import { sendVerificationEmail } from '../../auth/sendVerificationEmail.js';
import { registerLocalStrategy } from '../../auth/strategies/local/register.js';
import { afterChange } from '../../fields/hooks/afterChange/index.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { beforeChange } from '../../fields/hooks/beforeChange/index.js';
import { beforeValidate } from '../../fields/hooks/beforeValidate/index.js';
import { generateFileData } from '../../uploads/generateFileData.js';
import { unlinkTempFiles } from '../../uploads/unlinkTempFiles.js';
import { uploadFiles } from '../../uploads/uploadFiles.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import sanitizeInternalFields from '../../utilities/sanitizeInternalFields.js';
import { saveVersion } from '../../versions/saveVersion.js';
import { buildAfterOperation } from './utils.js';
export const createOperation = async (incomingArgs)=>{
    let args = incomingArgs;
    try {
        const shouldCommit = await initTransaction(args.req);
        // /////////////////////////////////////
        // beforeOperation - Collection
        // /////////////////////////////////////
        await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook)=>{
            await priorHook;
            args = await hook({
                args,
                collection: args.collection.config,
                context: args.req.context,
                operation: 'create',
                req: args.req
            }) || args;
        }, Promise.resolve());
        const { autosave = false, collection: { config: collectionConfig }, collection, depth, disableVerificationEmail, draft = false, overrideAccess, overwriteExistingFiles = false, req: { fallbackLocale, locale, payload, payload: { config, email } }, req, showHiddenFields } = args;
        let { data } = args;
        const shouldSaveDraft = Boolean(draft && collectionConfig.versions.drafts);
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        if (!overrideAccess) {
            await executeAccess({
                data,
                req
            }, collectionConfig.access.create);
        }
        // /////////////////////////////////////
        // Custom id
        // /////////////////////////////////////
        if (payload.collections[collectionConfig.slug].customIDType) {
            data = {
                _id: data.id,
                ...data
            };
        }
        // /////////////////////////////////////
        // Generate data for all files and sizes
        // /////////////////////////////////////
        const { data: newFileData, files: filesToUpload } = await generateFileData({
            collection,
            config,
            data,
            operation: 'create',
            overwriteExistingFiles,
            req,
            throwOnMissingFile: !shouldSaveDraft && collection.config.upload.filesRequiredOnCreate !== false
        });
        data = newFileData;
        // /////////////////////////////////////
        // beforeValidate - Fields
        // /////////////////////////////////////
        data = await beforeValidate({
            collection: collectionConfig,
            context: req.context,
            data,
            doc: {},
            global: null,
            operation: 'create',
            overrideAccess,
            req
        });
        // /////////////////////////////////////
        // beforeValidate - Collections
        // /////////////////////////////////////
        await collectionConfig.hooks.beforeValidate.reduce(async (priorHook, hook)=>{
            await priorHook;
            data = await hook({
                collection: collectionConfig,
                context: req.context,
                data,
                operation: 'create',
                req
            }) || data;
        }, Promise.resolve());
        // /////////////////////////////////////
        // beforeChange - Collection
        // /////////////////////////////////////
        await collectionConfig.hooks.beforeChange.reduce(async (priorHook, hook)=>{
            await priorHook;
            data = await hook({
                collection: collectionConfig,
                context: req.context,
                data,
                operation: 'create',
                req
            }) || data;
        }, Promise.resolve());
        // /////////////////////////////////////
        // beforeChange - Fields
        // /////////////////////////////////////
        const resultWithLocales = await beforeChange({
            collection: collectionConfig,
            context: req.context,
            data,
            doc: {},
            docWithLocales: {},
            global: null,
            operation: 'create',
            req,
            skipValidation: shouldSaveDraft && collectionConfig.versions.drafts && !collectionConfig.versions.drafts.validate
        });
        // /////////////////////////////////////
        // Write files to local storage
        // /////////////////////////////////////
        if (!collectionConfig.upload.disableLocalStorage) {
            await uploadFiles(payload, filesToUpload, req);
        }
        // /////////////////////////////////////
        // Create
        // /////////////////////////////////////
        let doc;
        if (collectionConfig.auth && !collectionConfig.auth.disableLocalStrategy) {
            if (data.email) {
                resultWithLocales.email = data.email.toLowerCase();
            }
            if (collectionConfig.auth.verify) {
                resultWithLocales._verified = Boolean(resultWithLocales._verified) || false;
                resultWithLocales._verificationToken = crypto.randomBytes(20).toString('hex');
            }
            doc = await registerLocalStrategy({
                collection: collectionConfig,
                doc: resultWithLocales,
                password: data.password,
                payload: req.payload,
                req
            });
        } else {
            doc = await payload.db.create({
                collection: collectionConfig.slug,
                data: resultWithLocales,
                req
            });
        }
        const verificationToken = doc._verificationToken;
        let result = sanitizeInternalFields(doc);
        // /////////////////////////////////////
        // Create version
        // /////////////////////////////////////
        if (collectionConfig.versions) {
            await saveVersion({
                id: result.id,
                autosave,
                collection: collectionConfig,
                docWithLocales: result,
                payload,
                req
            });
        }
        // /////////////////////////////////////
        // Send verification email if applicable
        // /////////////////////////////////////
        if (collectionConfig.auth && collectionConfig.auth.verify) {
            await sendVerificationEmail({
                collection: {
                    config: collectionConfig
                },
                config: payload.config,
                disableEmail: disableVerificationEmail,
                email: payload.email,
                req,
                token: verificationToken,
                user: result
            });
        }
        // /////////////////////////////////////
        // afterRead - Fields
        // /////////////////////////////////////
        result = await afterRead({
            collection: collectionConfig,
            context: req.context,
            depth,
            doc: result,
            draft,
            fallbackLocale,
            global: null,
            locale,
            overrideAccess,
            req,
            showHiddenFields
        });
        // /////////////////////////////////////
        // afterRead - Collection
        // /////////////////////////////////////
        await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook)=>{
            await priorHook;
            result = await hook({
                collection: collectionConfig,
                context: req.context,
                doc: result,
                req
            }) || result;
        }, Promise.resolve());
        // /////////////////////////////////////
        // afterChange - Fields
        // /////////////////////////////////////
        result = await afterChange({
            collection: collectionConfig,
            context: req.context,
            data,
            doc: result,
            global: null,
            operation: 'create',
            previousDoc: {},
            req
        });
        // /////////////////////////////////////
        // afterChange - Collection
        // /////////////////////////////////////
        await collectionConfig.hooks.afterChange.reduce(async (priorHook, hook)=>{
            await priorHook;
            result = await hook({
                collection: collectionConfig,
                context: req.context,
                doc: result,
                operation: 'create',
                previousDoc: {},
                req: args.req
            }) || result;
        }, Promise.resolve());
        // /////////////////////////////////////
        // afterOperation - Collection
        // /////////////////////////////////////
        result = await buildAfterOperation({
            args,
            collection: collectionConfig,
            operation: 'create',
            result
        });
        await unlinkTempFiles({
            collectionConfig,
            config,
            req
        });
        // /////////////////////////////////////
        // Return results
        // /////////////////////////////////////
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(args.req);
        throw error;
    }
};

//# sourceMappingURL=create.js.map