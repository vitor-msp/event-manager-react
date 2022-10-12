// data types
export interface IUpdateUserDataRequest {
  name: string;
}
export interface IUserData {
  id: number;
  email: string;
  name: string;
}
export interface ICurrentUserData {
  data: IUserData | null;
}

// state type
export interface IUserDataState {
  data: ICurrentUserData;
}
