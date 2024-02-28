export const setToken = (key: string, token: string) => {
  if (typeof localStorage !== undefined) localStorage?.setItem(key, token);
};

export const getToken = (key: string) => {
  if (typeof localStorage !== undefined) {
    const token = localStorage?.getItem(key);
    return token;
  } else return "";
};

export const clearToken = (key: string) => {
  if (typeof localStorage !== undefined) localStorage?.removeItem(key);
};
