import React from 'react'
import SelectorCard from '../Components/SelectorCard'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'

function Selector ({ currentProduct, changeCurrentProduct }: { currentProduct: string, changeCurrentProduct: (value: string) => void }): JSX.Element {
  const userProducts = useSelector((store: RootState) => store.products.userProducts)

  return (
    <div className='selector'>
      <div className="selector-container">
      <div className="selector__list">{
        userProducts.map(el => <SelectorCard currentProduct={currentProduct} changeCurrentProduct={changeCurrentProduct} product={el} key={el.id}/>)
      }</div>
      </div>
    </div>
  )
}

export default Selector
