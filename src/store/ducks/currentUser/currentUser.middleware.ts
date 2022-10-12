import { decodeJwt, saveJwt } from "../../../services/jwt.service";
import { AppThunk } from "../../store";
import { loginUser } from "./currentUser.slice";
import { ILoginRequest } from "./currentUser.types";

export const loginRequest =
  (loginData: ILoginRequest): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      const res = {
        data: {
          id: 1,
          jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoxLCJpYXQiOjE1MTYyMzkwMjJ9.Ltv_sh4_oDD92HY8Hp3S3IafvsXjqMGPdUgRRSQzbU4",
        },
      };

      saveJwt({ jwt: res.data.jwt });

      const userId = decodeJwt(res.data.jwt);

      console.log(userId)

      // dispatch(loginUser({ id: userId }));
    } catch (error) {
      alert("Error in login request");
      //   dispatch(postGraphFailure());
    }
  };
