export type jwtData = {
  jwt: string;
};

const localStorageKey = "eventManagerKey";

export const saveJwt = (jwtData: jwtData): boolean => {
  localStorage.setItem(localStorageKey, jwtData.jwt);

  const savedJwt = findJwt();

  return jwtData.jwt === savedJwt ? true : false;
};

export const findJwt = (): string | null => {
  const jwt = localStorage.getItem(localStorageKey);

  return jwt ?? null;
};

export const removeJwt = (): boolean => {
  localStorage.removeItem(localStorageKey);

  const jwt = findJwt();

  return jwt ? false : true;
};
