import React from 'react'
import { type UserProduct } from '../../Products/type'
import SwiperComponent from '../../Swiper/Components/Swiper'

function SelectorCard ({ product, changeCurrentProduct, setModal }: { product: UserProduct, currentProduct: string, changeCurrentProduct: (value: string) => void, setModal: (a: boolean) => void }): JSX.Element {
  function handeClick (): void {
    changeCurrentProduct(product.title)
    setModal(false)
  }

  return (
    <>
    <div className="product-card-container">
    <div className="product-card">
      <div className="pic-container">
      <SwiperComponent img={product.ProductImages}></SwiperComponent>
      </div>
      <div className="product-card__text">
      <h2 className='product-card__title'>{product.title}</h2>
      <p className="product-card__desc">{product.description}</p>
      </div>

      <button onClick={handeClick} type='button' className='product-card__button product-card__switch-button'>Поменять</button>
    </div>
    </div>
    </>

  )
}

export default SelectorCard
