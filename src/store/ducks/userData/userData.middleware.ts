import { findJwt } from "../../../services/jwt.service";
import {
  getUserDataRequestApi,
  updateUserDataRequestApi,
} from "../../../services/userApi.service";
import { AppThunk } from "../../store";
import { setUserData, updateUserData } from "./userData.slice";
import { IUpdateUserDataRequest, IUserData } from "./userData.types";

export const getUserDataRequest = (): AppThunk => async (dispatch) => {
  try {
    const jwt = findJwt();

    if (!jwt) throw new Error("Error to find jwt.");

    const userData: IUserData = await getUserDataRequestApi(jwt);

    dispatch(setUserData(userData));
  } catch (error) {
    alert("Error to get user data.");
  }
};

export const updateUserDataRequest =
  (userData: IUpdateUserDataRequest): AppThunk =>
  async (dispatch) => {
    try {
      const jwt = findJwt();

      if (!jwt) throw new Error("Error to find jwt.");

      const res = await updateUserDataRequestApi(userData, jwt);

      if(res.message) throw new Error(res.message);

      dispatch(updateUserData(userData));
    } catch (error) {
      //@ts-ignore
      alert(`Error to update user data: ${error.message}`);
    }
  };
