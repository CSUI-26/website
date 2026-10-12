declare type RecordValues<T extends Record<PropertyKey, any>> = T[keyof T];
