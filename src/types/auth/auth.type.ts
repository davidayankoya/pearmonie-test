import { UserResponse } from "./user.type";

export interface UserModel extends UserResponse {
    // full_name: string;
    // position: string;
} 

interface AuthToken {
    token: string;
    type: string;
}

export interface AuthCreds {
    username: string;
    password: string;
}

export interface ResetPasswordCreds {
    email: string;
}

export interface LoginResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    gender: string;
    image: string;
}

export interface AuthUserResponse {
    status: string;
    message: string;
    user: UserModel;
}
