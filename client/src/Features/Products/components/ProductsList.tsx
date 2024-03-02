import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/store'
import { initProducts } from '../productSlice'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import ProductCard from '../components/ProductCard'

function ProductsList (): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initProducts()).catch(console.log)
  }, [])

  const products = useSelector((store: RootState) => store.products.products)
  return (
    <section className='products'>
      <div className="products__list">{
        products.map(el => <ProductCard product={el} key={el.id}/>)
      }</div>
    </section>
  )
}

export default ProductsList
