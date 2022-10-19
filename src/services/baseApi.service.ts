import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const injectJwt = (jwt: string) => {
  const header = {
    Authorization: `Bearer ${jwt}`,
  };
  return header;
};
