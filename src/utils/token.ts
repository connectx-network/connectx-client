export const setToken = (key: string, token: string) => {
  localStorage.setItem(key, token);
};

export const getToken = (key: string) => {
  const token = localStorage.getItem(key);
  return token;
};

export const clearToken = (key: string) => {
  localStorage.removeItem(key);
};
