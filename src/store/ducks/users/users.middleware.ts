import { findJwt } from "../../../services/jwt.service";
import { getUsersRequestApi } from "../../../services/userApi.service";
import { AppThunk } from "../../store";
import { addUsers } from "./users.slice";
import { IUsers } from "./users.types";

export const getUsersRequest = (): AppThunk => async (dispatch) => {
  try {
    const jwt = findJwt();

    const users: IUsers = await getUsersRequestApi(jwt);

    dispatch(addUsers(users));
  } catch (error) {
    alert("Error in request users");
  }
};
