import { IUsers } from "../store/ducks/users/users.types";

export const usersMock: IUsers = {
  users: [
    { id: 1, email: "one@test.com" },
    { id: 2, email: "two@test.com" },
    { id: 3, email: "three@test.com" },
    { id: 4, email: "four@test.com" },
  ],
};
