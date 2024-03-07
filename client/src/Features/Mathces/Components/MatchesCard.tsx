import React from 'react'
import { type Product } from '../../Products/type'
import ProductCard from '../../Products/components/ProductCard'

export default function MatchesCard ({ matches }: { matches: Product[] }): JSX.Element {
  return (
    <>
    <div style={{ backgroundColor: 'red', margin: '1rem' }}>
    {matches.map(el => <ProductCard product={el} key={el.id}/>)}
    </div>
    </>
  )
}
