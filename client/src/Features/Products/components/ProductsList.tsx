/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../store/store'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import ProductCard from '../components/ProductCard'
import { initProducts } from '../productSlice'

function ProductsList (): JSX.Element {
  const products = useSelector((store: RootState) => store.products.products)

  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [scrollCount, setscrollCount] = useState(1)

  useEffect(() => {
    if (fetching) {
      dispatch(initProducts(currentPage)).catch(console.log)
      setFetching(false)
      setCurrentPage((prev) => prev + 8)
    }
  }, [fetching])

  useEffect(() => {
    const container = document.querySelector('.products__list')

    if (container) {
      container.addEventListener('scroll', scrollHendler)
    }

    return function () {
      if (container) {
        container.removeEventListener('scroll', scrollHendler)
      }
    }
  }, [])

  const scrollHendler = (e: any): void => {
    if (e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight * scrollCount) <= 1) {
      setFetching(true)
      setscrollCount((prev) => prev + 1)
    }
  }

  return (
    <section className='products'>
      <div className="products-container">
      <div className="products__list">{
        products.map(el => <ProductCard product={el} key={el.id}/>)
      }</div>
      </div>
    </section>
  )
}

export default ProductsList
