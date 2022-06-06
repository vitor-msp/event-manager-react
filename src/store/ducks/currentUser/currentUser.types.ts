// data types
export interface ILoginRequest {
  email: string;
  password: string;
}
export interface ICurrentUser {
  id: number | null;
}

// state type
export interface ICurrentUserState {
  data: ICurrentUser;
}
