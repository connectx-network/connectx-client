export const objectToQueryStringByComma = (obj: any) => {
  const keys = Object.keys(obj);
  const keyValuePairs = keys.map((key) => {
    if (Array.isArray(obj[key]) && obj[key].length === 0) return;
    return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
  });
  return keyValuePairs.join("&");
};
