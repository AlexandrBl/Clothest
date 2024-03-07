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

export const updateProductFetch = async ({ obj, id }: { obj: FormData, id: number }): Promise<{ message: string }> => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    body: obj
  })
  if (res.ok) {
    const data = await res.json()
    return data
  }
  const { message } = await res.json()
  throw message
}
