import axios from "axios";
import {
  ISignUpData,
  SignUpFailure,
  SignUpSuccess,
} from "../components/SignUp";
import {
  ILoginRequest,
  ILoginResponse,
} from "../store/ducks/currentUser/currentUser.types";
import {
  IUpdateUserDataRequest,
  IUserData,
} from "../store/ducks/userData/userData.types";

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

export const updateUserDataRequestApi = async (
  userData: IUpdateUserDataRequest,
  jwt: string
): Promise<void> => {
  const res = await api.put("/user", userData, {
    headers: injectJwt(jwt),
  });

  if (res.status !== 200) throw new Error("Error to login.");
};

export const signUpRequestApi = async (
  signUpData: ISignUpData
): Promise<SignUpSuccess | SignUpFailure> => {
  const res = await api
    .post("/user", signUpData)
    .then((res) => res)
    .catch((error) => error.response);

  return res.data;
};
