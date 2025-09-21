export interface User {
  _id: string
  username: string
  password: string
  balance: number
  avatar: string
  role: string
}

export interface RegisterUser {
  username: string
  password: string
}

export interface RegisterResponse {
  success: boolean
  message?: string
}

export interface LoginResponse {
  message: string
  user: User
}

export interface LoginUser {
  username: string
  password: string
}

export interface ProfileResponse {
  user: User;
}

export interface LogoutResponse {
  message: string
}