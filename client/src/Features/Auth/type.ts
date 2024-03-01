export interface User {
  name: string
  email: string
  password: string
}

export type UserAndCpassword = User & { cpassword: string }

export type UserAndId = User & { id: number }

export type UserWithoutName = Omit<User, 'name'>

export interface StateAuth {
  user: null | User
  message: string | undefined
}
