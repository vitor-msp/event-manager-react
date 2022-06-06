import { AppThunk } from "../../store";
import { loginUser } from "./currentUser.slice";
import { ILoginRequest } from "./currentUser.types";

export const loginRequest =
  (loginData: ILoginRequest): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      const res = {
        data: { id: 1 },
      };

      dispatch(loginUser(res.data));
    } catch (error) {
      alert("Error in login request");
      //   dispatch(postGraphFailure());
    }
  };
