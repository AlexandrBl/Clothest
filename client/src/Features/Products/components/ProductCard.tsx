import React from 'react'
import { type Product } from '../type'

function ProductCard ({ product }: { product: Product }): JSX.Element {
  return (
    <h1>{product.title}</h1>
  )
}

export default ProductCard
