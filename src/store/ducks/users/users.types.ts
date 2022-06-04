// data types
export interface IUser {
  id: number;
  email: string;
}
export interface IUsers {
  users: IUser[];
}

// state type
export interface IUsersState {
  data: IUsers;
}
