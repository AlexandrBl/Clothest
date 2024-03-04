import type { Match, MatchWithoutIdAndMutual, Product } from './type'

export const initProductsFetch = async (currentPage: number): Promise<Product[]> => {
  const res = await fetch(`/api/products?page=${currentPage}&pageSize=8`)

  const data = await res.json()

  return data
}

export const initUserProductsFetch = async (): Promise<Product[]> => {
  const res = await fetch('/api/products/userProducts')
  const data = await res.json()
  return data
}

export const deleteUserProductsFetch = async (id: number): Promise<{ message: string, id: number }> => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE'
  })
  const data = await res.json()
  return data
}

export const addMatchFetch = async (obj: MatchWithoutIdAndMutual): Promise<{ message: string, match: Match }> => {
  const res = await fetch('/api/matches/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  const data = await res.json()
  console.log(data)

  return data
}
