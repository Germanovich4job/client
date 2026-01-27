export interface UserDTO {
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

export interface RegisterFormData extends UserDTO {
  repeatPassword: string
}

export interface LoginFormData extends Pick<UserDTO, "email" | "password"> {}
