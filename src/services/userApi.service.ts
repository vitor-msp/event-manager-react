import axios from "axios";
import {
  ILoginRequest,
  ILoginResponse,
} from "../store/ducks/currentUser/currentUser.types";

const configureAxios = () => {
  const apiUrl: string = "http://localhost:8080";

  return axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-type": "application/json",
    },
  });
};

const api = configureAxios();

export const loginRequestApi = async (
  loginData: ILoginRequest
): Promise<ILoginResponse> => {
  const res = await api.post("/user/auth", loginData);

  return res.data;
};
