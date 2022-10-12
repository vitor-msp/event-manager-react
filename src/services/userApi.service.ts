import axios from "axios";
import {
  ILoginRequest,
  ILoginResponse,
} from "../store/ducks/currentUser/currentUser.types";
import { IUserData } from "../store/ducks/userData/userData.types";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const injectJwt = (jwt: string) => {
  const header = {
    Authorization: `Bearer ${jwt}`,
  };
  return header;
};

export const loginRequestApi = async (
  loginData: ILoginRequest
): Promise<ILoginResponse> => {
  const res = await api.post("/user/auth", loginData);

  return res.data;
};

export const getUserDataRequestApi = async (
  jwt: string
): Promise<IUserData> => {
  const res = await api.get("/user", {
    headers: injectJwt(jwt),
  });

  return res.data;
};
