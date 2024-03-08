import { type Product } from '../Products/type'

export interface Favorite {
  idProduct: number
  idUser: number
}

export interface StateFavorites {
  products: Product[]
  message: string | undefined
}
