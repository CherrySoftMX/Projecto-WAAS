export const removeNullProperties = (obj: any) => {
  for (var propName in obj) {
    if (!obj[propName]) {
      delete obj[propName];
    }
  }
  return obj;
};
