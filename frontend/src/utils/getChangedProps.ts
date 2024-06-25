interface GenericObject {
  [key: string]: any;
}

export function getChangedProps<T>(
  oldObject: GenericObject,
  newObject: GenericObject
) {
  const filteredObject: {
    [key: keyof typeof newObject]: unknown;
  } = {};

  Object.entries(newObject).forEach(([key, value]) => {
    if (!oldObject[key] || value !== oldObject[key]) {
      filteredObject[key] = value;
    }
  });

  return filteredObject as Partial<T>;
}
