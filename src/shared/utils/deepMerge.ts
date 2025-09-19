export type IndexedObject = { [key: string]: any };

const isObject = (item: any): item is IndexedObject => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const deepMerge = <T extends IndexedObject, U extends IndexedObject>(
  target: T,
  source: U,
): T & U => {
  const output = { ...target } as T & U;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key as keyof T & U] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
};
