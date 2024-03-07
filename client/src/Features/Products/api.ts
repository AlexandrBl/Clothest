import type { Category, Match, MatchWithoutIdAndMutual, Product } from './type'

export const initProductsFetch = async (currentPage: number): Promise<Product[]> => {
  const res = await fetch(`/api/products?page=${currentPage}&pageSize=16`)
  const data = await res.json()

  return data
}

export const initUserProductsFetch = async (): Promise<Product[]> => {
  const res = await fetch('/api/products/userProducts')
  const data = await res.json()
  return data
}

export const initCategoriesFetch = async (): Promise<Category[]> => {
  const res = await fetch('/api/categories')
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

  return data
}

export const initMatchesFetch = async (): Promise<{ message: string, matches: Product[][] }> => {
  const res = await fetch('/api/matches/init')

  const data = await res.json()

  return data
}

export const addDislikefetch = async (id: number): Promise<{ message: string }> => {
  const res = await fetch('/api/products/dislike', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ id })
  })
  const data = await res.json()

  return data
}

export const deleteProductImageFetch = async (id: number): Promise<{ message: string, id: number }> => {
  const res = await fetch(`/api/productImages/${id}`, {
    method: 'DELETE'
  })
  const data = await res.json()
  return data
}
