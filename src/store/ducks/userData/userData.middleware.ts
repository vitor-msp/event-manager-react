import { findJwt } from "../../../services/jwt.service";
import { getUserDataRequestApi } from "../../../services/userApi.service";
import { AppThunk } from "../../store";
import { setUserData } from "./userData.slice";
import { IUserData } from "./userData.types";

export const getUserDataRequest = (): AppThunk => async (dispatch) => {
  try {
    const jwt = findJwt();

    if (!jwt) throw new Error("Error to find jwt.");

    const userData: IUserData = await getUserDataRequestApi(jwt);
    console.log(userData);
    dispatch(setUserData(userData));
  } catch (error) {
    alert("Error to get user data.");
  }
};
