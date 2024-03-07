import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import ProductCard from '../components/ProductCard'

function ProductsList ({ scrollHendler }: { scrollHendler: (e: any) => void }): JSX.Element {
  const products = useSelector((store: RootState) => store.products.products)

  useEffect(() => {
    const container = document.querySelector('.products__list')

    if (container !== null) {
      container.addEventListener('scroll', scrollHendler)
    }

    return function () {
      if (container !== null) {
        container.removeEventListener('scroll', scrollHendler)
      }
    }
  }, [])

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
