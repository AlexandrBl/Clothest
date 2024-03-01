export interface Product {
  id: number
  title: string
  description: string
  userId: number
  categoryId: number
  isModerated: boolean
}

export interface StateProducts {
  products: Product[]
  message: string | undefined
}
