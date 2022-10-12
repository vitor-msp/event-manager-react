import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const injectJwt = (jwt: string) => {
  const header = {
    Authorization: `Bearer ${jwt}`,
  };
  return header;
};
