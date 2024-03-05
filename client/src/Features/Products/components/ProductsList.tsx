import React from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import ProductCard from '../components/ProductCard'

function ProductsList (): JSX.Element {
  const products = useSelector((store: RootState) => store.products.products)

  return (
    <section className='products'>
      <div className="products-container">
      <div className="products__list">{
        products.map(el => <ProductCard product={el} key={el.id }/>)
      }</div>
      </div>
    </section>

  )
}

export default ProductsList
