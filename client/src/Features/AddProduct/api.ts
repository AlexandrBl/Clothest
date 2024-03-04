import { type UserProduct } from '../Products/type'

export const addProductFetch = async (obj: FormData): Promise<{ message: string, product: UserProduct }> => {
  const res = await fetch('/api/products/', {
    method: 'POST',
    body: obj
  })
  if (res.ok) {
    const data = await res.json()
    return data
  }
  const { message } = await res.json()
  throw message
}
