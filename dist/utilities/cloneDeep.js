export function cloneDeep(object, cache = new WeakMap()) {
    if (object === null)
        return null;
    if (cache.has(object)) {
        return cache.get(object);
    }
    // Handle Date
    if (object instanceof Date) {
        return new Date(object.getTime());
    }
    // Handle RegExp
    if (object instanceof RegExp) {
        return new RegExp(object.source, object.flags);
    }
    // Handle Map
    if (object instanceof Map) {
        const clonedMap = new Map();
        cache.set(object, clonedMap);
        for (const [key, value] of object.entries()) {
            clonedMap.set(key, cloneDeep(value, cache));
        }
        return clonedMap;
    }
    // Handle Set
    if (object instanceof Set) {
        const clonedSet = new Set();
        cache.set(object, clonedSet);
        for (const value of object.values()) {
            clonedSet.add(cloneDeep(value, cache));
        }
        return clonedSet;
    }
    // Handle Array and Object
    if (typeof object === 'object' && object !== null) {
        if ('$$typeof' in object && typeof object.$$typeof === 'symbol') {
            return object;
        }
        const clonedObject = Array.isArray(object)
            ? []
            : Object.create(Object.getPrototypeOf(object));
        cache.set(object, clonedObject);
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key) ||
                Object.getOwnPropertySymbols(object).includes(key)) {
                clonedObject[key] = cloneDeep(object[key], cache);
            }
        }
        return clonedObject;
    }
    // Handle all other cases
    return object;
}
//# sourceMappingURL=cloneDeep.js.map