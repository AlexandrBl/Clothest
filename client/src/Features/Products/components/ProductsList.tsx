/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../store/store'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import ProductCard from '../components/ProductCard'
import { createAsyncThunk } from '@reduxjs/toolkit'

import * as api from '../api'

function ProductsList (): JSX.Element {
  const initProducts = createAsyncThunk(
    'products/init',
    async () => await api.initProductsFetch()
  )

  const products = useSelector((store: RootState) => store.products.products)
  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (fetching) {
      dispatch(initProducts()).catch(console.log)
      setFetching(false)

      // dispatch(fetchProductData(currentPage)).catch(console.log)
      // setFetching(false)
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

  const scrollHendler = (e): void => {
    if ((e.target.scrollHeight * currentPage / 2) < e.target.scrollTop + 100) {
      console.log('scroll')

      // setFetching(true)
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
