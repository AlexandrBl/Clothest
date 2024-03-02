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

export interface StateProducts {
  products: Product[]
  message: string | undefined
}
