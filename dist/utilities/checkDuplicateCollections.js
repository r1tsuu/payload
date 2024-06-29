import { DuplicateCollection } from '../errors/DuplicateCollection.js';
const getDuplicates = (arr)=>arr.filter((item, index)=>arr.indexOf(item) !== index);
const checkDuplicateCollections = (collections)=>{
    const duplicateSlugs = getDuplicates(collections.map((c)=>c.slug));
    if (duplicateSlugs.length > 0) {
        throw new DuplicateCollection('slug', duplicateSlugs);
    }
};
export default checkDuplicateCollections;

//# sourceMappingURL=checkDuplicateCollections.js.map