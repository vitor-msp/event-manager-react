import { ICurrentUser } from "../store/ducks/currentUser/currentUser.types";

export const userIsLoggedIn = (currentUser: ICurrentUser): boolean => {
  const userId = currentUser.id;

  return userId && typeof userId === "number" ? true : false;
};
