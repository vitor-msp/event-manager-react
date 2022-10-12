import { saveJwt } from "../../../services/jwt.service";
import { AppThunk } from "../../store";
import { loginUser } from "./currentUser.slice";
import { ILoginRequest } from "./currentUser.types";

export const loginRequest =
  (loginData: ILoginRequest): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      const res = {
        data: { id: 1, jwt: "jwt-test" },
      };

      const jwtIsSaved = saveJwt({ jwt: res.data.jwt });

      if (!jwtIsSaved) throw new Error("Jwt cannot be saved in local storage.");

      dispatch(loginUser(res.data));
    } catch (error) {
      alert("Error in login request");
      //   dispatch(postGraphFailure());
    }
  };
