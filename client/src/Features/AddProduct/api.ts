import type { Product, ProductAndId } from './type'

export const addProductFetch = async (obj: Product): Promise<ProductAndId> => {
  const res = await fetch('/api/products/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  if (res.ok) {
    const data = await res.json()
    return data.product
  }
  const { message } = await res.json()
  throw message
}
