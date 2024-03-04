import { type Favorite } from './type'

export const addFavoriteFetch = async (obj: Favorite): Promise<{ message: string }> => {
  const res = await fetch('/api/products/favorite', {
    method: 'POST',
    body: JSON.stringify(obj)
  })
  if (res.ok) {
    const data = await res.json()
    return data
  }
  const { message } = await res.json()
  throw message
}
