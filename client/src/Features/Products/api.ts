import type { Product } from './type'

export const initProductsFetch = async (currentPage: number): Promise<Product[]> => {
  const res = await fetch(`/api/products?page=${currentPage}&pageSize=8`)

  const data = await res.json()

  return data
}
