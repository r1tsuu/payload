import fs from 'fs';
const fileExists = async (filename)=>{
    try {
        await fs.promises.stat(filename);
        return true;
    } catch (err) {
        return false;
    }
};
export default fileExists;

//# sourceMappingURL=fileExists.js.map