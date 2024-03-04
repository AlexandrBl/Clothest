import { type Product } from '../Products/type'
import { type Favorite } from './type'

export const addFavoriteFetch = async (obj: Favorite): Promise<{ message: string }> => {
  const res = await fetch('/api/favorites/addFavorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  if (res.ok) {
    const data = await res.json()
    return data
  }
  const { message } = await res.json()
  throw message
}

export const initFavoritesFetch = async (): Promise<Product[]> => {
  const res = await fetch('/api/favorites')
  const data = await res.json()
  return data
}
