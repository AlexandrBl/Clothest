import React from 'react'
import { type UserProduct } from '../../Products/type'

function SelectorCard ({ product, currentProduct, changeCurrentProduct }: { product: UserProduct, currentProduct: string, changeCurrentProduct: (value: string) => void }): JSX.Element {
  function handeClick (): void {
    changeCurrentProduct(product.title)
  }

  return (
    <>
    <div className="product-card-container">
    <div className="product-card">
      <div className="pic-container">
      <img src="/img/placeholder.jpeg" alt="placeholder" className="product-pic" />
      </div>
      <div className="product-card__text">
      <h2 className='product-card__title'>{product.title}</h2>
      <p className="product-card__desc">{product.description}</p>
      </div>

      <button onClick={handeClick} type='button' className='product-card__button product-card__switch-button'>Switch</button>
    </div>
    </div>
    </>

  )
}

export default SelectorCard
