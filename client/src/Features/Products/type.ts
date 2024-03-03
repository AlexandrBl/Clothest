export interface FullUser {
  id: number
  name: string
  email: string
  password: string
  cityId: number
  rating: string
  isAdmin: boolean
  userpic: string
  City: City
  defaultProduct: string
}

export interface City {
  id: number
  name: string
}

export interface Product {
  id: number
  title: string
  description: string
  userId: number
  categoryId: number
  isModerated: boolean
  User: FullUser
}

export type UserProduct = Omit<Product, 'User'>

export interface StateProducts {
  userProducts: UserProduct[]
  products: Product[]
  message: string | undefined
}
