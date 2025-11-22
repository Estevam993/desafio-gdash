type LoginFormType = {
  email: string,
  password: string,
}

type LoginErrorType = {
  email: string,
  password: string,
}

type LoginApiReturn = {
  "access_token": string,
}

export type {LoginFormType, LoginErrorType, LoginApiReturn}