import { decodeJwt, saveJwt } from "../../../services/jwt.service";
import { loginRequestApi } from "../../../services/userApi.service";
import { AppThunk } from "../../store";
import { loginUser } from "./currentUser.slice";
import { ILoginRequest } from "./currentUser.types";

export const loginRequest =
  (loginData: ILoginRequest): AppThunk =>
  async (dispatch) => {
    try {
      const jwtData = await loginRequestApi(loginData);

      saveJwt({ jwt: jwtData.jwt });

      const userId = decodeJwt(jwtData.jwt);

      dispatch(loginUser({ id: userId }));
    } catch (error) {
      alert("Error in login request");
      //   dispatch(postGraphFailure());
    }
  };
