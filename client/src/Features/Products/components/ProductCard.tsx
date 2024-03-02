import React, { useEffect, useState } from 'react'
import { type Product } from '../type'

function ProductCard ({ product }: { product: Product }): JSX.Element {
  console.log(product)
  const [sellerRate, setSellerRate] = useState('')

  useEffect(() => {
    product.User.rating === 'Нет отзывов' ? setSellerRate('0') : setSellerRate(`${product.User.rating}`)
  }, [])
  return (
    <>
    <div className="product-card">
      <p className="product-card__city">{product.User.City.name}</p>
      <div className="pic-container">
      <img src="/img/placeholder.jpeg" alt="placeholder" className="product-pic" />
      </div>
      <div className="product-card__text">
      <h2 className='product-card__title'>{product.title}</h2>
      <p className="product-card__desc">{product.description}</p>
      </div>

      <button type='button' className='product-card__button product-card__fav-button'>Fav</button>
      <button type='button' className='product-card__button product-card__like-button'>Like</button>
      <button type='button' className='product-card__button product-card__dislike-button'>Dislike</button>

      <div className="seller">
        <div className="seller-container">
        <p className="seller__rate">{sellerRate}</p>
        <div className="seller__pic-container">
          <img src="/img/userpicdefault.jpeg" alt="" className="seller__pic" />
        </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default ProductCard
