import { IChangePasswordRequest } from "../components/ChangePassword";
import { ICurrentUser } from "../store/ducks/currentUser/currentUser.types";
import { findJwt } from "./jwt.service";
import { changePasswordRequestApi } from "./userApi.service";

export const userIsLoggedIn = (currentUser: ICurrentUser): boolean => {
  const userId = currentUser.id;

  return userId && typeof userId === "number" ? true : false;
};

export const changePasswordRequest = async (
  changePasswordData: IChangePasswordRequest
): Promise<boolean> => {
  const jwt = findJwt();

  const res = await changePasswordRequestApi(changePasswordData, jwt);

  //@ts-ignore
  if (res.message) {
    //@ts-ignore
    alert(`Error to change password: ${res.message}`);
    return false;
  }

  alert(`Password updated`);
  return true; 
};
