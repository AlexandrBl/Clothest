import type { ProductAndId } from './type'

export const addProductFetch = async (obj: FormData): Promise<{ message: string, product: ProductAndId }> => {
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
