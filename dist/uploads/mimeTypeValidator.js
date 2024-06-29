export const mimeTypeValidator = (mimeTypes)=>(val, { siblingData })=>{
        if (!siblingData.filename) {
            return true;
        }
        if (!val) {
            return 'Invalid file type';
        }
        const cleanedMimeTypes = mimeTypes.map((v)=>v.replace('*', ''));
        return !cleanedMimeTypes.some((v)=>val.startsWith(v)) ? `Invalid file type: '${val}'` : true;
    };

//# sourceMappingURL=mimeTypeValidator.js.map