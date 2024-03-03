import React, { useEffect, useState } from 'react'
import { type FullUser, type Product } from '../type'
import { type RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import Selector from '../../Selector/Selector'

function ProductCard ({ product, user }: { product: Product, user: FullUser }): JSX.Element {
  const [sellerRate, setSellerRate] = useState('')
  // const [currentProduct, setCurrentProduct] = useState(user.defaultProduct)

  const userProducts = useSelector((store: RootState) => store.products.userProducts)
  console.log(userProducts, 123123123)

  useEffect(() => {
    product.User.rating === 'Нет отзывов' ? setSellerRate('0') : setSellerRate(`${product.User.rating}`)
  }, [])
  return (
    <>
    <div className="product-card-container">
    <div className="product-card">
      <p className="product-card__city">{product.User.City.name}</p>
      <div className="pic-container">
      <img src="/img/placeholder.jpeg" alt="placeholder" className="product-pic" />
      </div>
      <div className="product-card__text">
      <h2 className='product-card__title'>{product.title}</h2>
      <p className="product-card__desc">{product.description}</p>
      </div>
      {user !== null && <div className='product-card__select-container'>
      Вы меняете
      <Selector value={userProducts.map(el => el.id)} label={userProducts.map(el => el.title)}></Selector>

    </div>}

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
    </div>
    </>

  )
}

export default ProductCard
