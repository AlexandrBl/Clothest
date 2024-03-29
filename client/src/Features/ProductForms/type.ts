export interface Product {
  title: string
  description: string
  category: string
}

export interface ProductAndId extends Product {
  id: number
}

export type CustomFileType = File & { pic: string }
