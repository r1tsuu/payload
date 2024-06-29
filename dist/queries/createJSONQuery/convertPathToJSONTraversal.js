import { formatJSONPathSegment } from './formatJSONPathSegment.js';
export const convertPathToJSONTraversal = (incomingSegments)=>{
    const segments = [
        ...incomingSegments
    ];
    segments.shift();
    return segments.reduce((res, segment, i)=>{
        const formattedSegment = formatJSONPathSegment(segment);
        if (i + 1 === segments.length) return `${res}->>${formattedSegment}`;
        return `${res}->${formattedSegment}`;
    }, '');
};

//# sourceMappingURL=convertPathToJSONTraversal.js.map