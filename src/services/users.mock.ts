import { IUsers } from "../store/ducks/users/users.types";

export const usersMock: IUsers = {
  users: [
    { id: 1, email: "one@teste.com" },
    { id: 2, email: "two@teste.com" },
    { id: 3, email: "three@teste.com" },
    { id: 4, email: "four@teste.com" },
  ],
};
