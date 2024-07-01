export const formatJSONPathSegment = (segment)=>{
    return Number.isNaN(parseInt(segment)) ? `'${segment}'` : segment;
};

//# sourceMappingURL=formatJSONPathSegment.js.map