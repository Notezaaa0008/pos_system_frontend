export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  status: string;
  user: {
    user_id: string;
    role: string;
    display_name: string;
    image?: string;
  };
}

export interface LogoutResponse {
  message: string;
  status: string;
}
