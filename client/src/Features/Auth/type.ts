import { type FullUser } from '../Products/type'

export interface User {
  name: string
  email: string
  password: string
}

export type UserAndCpassword = User & { cpassword: string }

export type UserAndId = User & { id: number }

export type UserWithProduct = UserAndId & { defaultProduct: string }

export type UserWithoutName = Omit<User, 'name'>

export interface StateAuth {
  user: null | FullUser
  message: string | undefined
}
