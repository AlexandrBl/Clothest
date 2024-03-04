export interface Favorite {
  idProduct: number
  idUser: number
}

export interface StateFavorites {
  favorites: Favorite[]
  message: string | undefined
}
