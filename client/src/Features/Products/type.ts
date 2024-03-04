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

export interface Category {
  id: number
  title: string
}

export interface StateProducts {
  userProducts: UserProduct[]
  products: Product[]
  categories: Category[]
  message: string | undefined
}

export interface Match {
  id: number
  productId1: number
  productId2: number
  isMutual: boolean
}

export type MatchWithoutIdAndMutual = Omit<Match, 'id' | 'isMutual'>

export interface StateMatches {
  matches: Match[]
  message: string | undefined
}
