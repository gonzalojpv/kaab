export interface AuthCredentials {
  email: string
  password: string
}

export interface UserAuthState {
  token: string | null | unknown
}
