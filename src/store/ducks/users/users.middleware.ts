import { usersMock } from "../../../services/users.mock";
import { AppThunk } from "../../store";
import { addUsers } from "./users.slice";

export const getUsersRequest = (): AppThunk => async (dispatch) => {
  try {
    // simulate request;
    const res = {
      data: usersMock,
    };

    dispatch(addUsers(res.data));
  } catch (error) {
    alert("Error in request users");
    //   dispatch(postGraphFailure());
  }
};
