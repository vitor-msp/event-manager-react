import jwtDecodePackage from "jwt-decode";

export type jwtData = {
  jwt: string;
};

const localStorageKey = "eventManagerKey";

export const saveJwt = (jwtData: jwtData): void => {
  try {
    localStorage.setItem(localStorageKey, jwtData.jwt);
  } catch (error) {
    throw new Error("Error to save jwt in local storage.");
  }
};

export const findJwt = (): string => {
  const jwt = localStorage.getItem(localStorageKey);

  if (!jwt) throw new Error("Error to find jwt.");

  return jwt;
};

export const removeJwt = (): void => {
  localStorage.removeItem(localStorageKey);

  const jwt = findJwt();

  if (jwt) throw new Error("Error to remove jwt from local storage.");
};

export const decodeJwt = (jwt: string): number => {
  const decodedJwt = jwtDecodePackage(jwt);

  if (!decodedJwt) throw new Error("Jwt cannot be decoded.");

  //@ts-ignore
  const userId: number = +decodedJwt.userId;

  if (!userId) throw new Error("User id not find in jwt.");

  return userId;
};
