import { IChangePasswordRequest } from "../components/ChangePassword";
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
import { IUsers } from "../store/ducks/users/users.types";
import { api, injectJwt } from "./baseApi.service";

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
): Promise<any> => {
  const res = await api
    .put("/user", userData, {
      headers: injectJwt(jwt),
    })
    .then((res) => res)
    .catch((error) => error.response);

  return res.data;
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

export const getUsersRequestApi = async (jwt: string): Promise<IUsers> => {
  const res = await api.get("/users", {
    headers: injectJwt(jwt),
  });

  return res.data;
};

export const changePasswordRequestApi = async (
  changePasswordData: IChangePasswordRequest,
  jwt: string
): Promise<{ message: string }> => {
  const res = await api
    .put("/user/password", changePasswordData, {
      headers: injectJwt(jwt),
    })
    .then((res) => res)
    .catch((error) => error.response);

  return res.data;
};
