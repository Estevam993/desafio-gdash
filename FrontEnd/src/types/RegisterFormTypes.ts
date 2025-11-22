type RegisterFormType = {
  email: string,
  name: string,
  password: string,
}

type RegisterErrorType = {
  email: string,
  name: string,
  password: string,
}

type RegisterApiReturn = {
  "user": {
    "id": string,
    "name": string,
    "email": string
  },
  "access_token": string,
  "code_status": string,
  "message": string
}

export type {RegisterFormType, RegisterErrorType, RegisterApiReturn}