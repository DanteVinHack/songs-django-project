export interface IUser {
  email: string | null;
  display_name: string | null;
  avatar: string | null;
  isAuth: boolean;
}

export interface IUserToken {
  user_id: number;
  access_token: string;
  token_type: string;
}

export interface IUserState extends IUser {
  error: null | string; 
}
