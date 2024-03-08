import React from 'react'
import { type Product } from '../../Products/type'
import SwiperComponent from '../../Swiper/Components/Swiper'

function MatchCard ({ product }: { product: Product }): JSX.Element {
  return (
    <>
        <div className="product-card-container">
            <div className="product-card product-card-from-match-page">
                <p className="product-card__city">{product.User.City.name}</p>
                <div className="pic-container">
                    <SwiperComponent img={product.ProductImages}></SwiperComponent>
                </div>
                <div className="product-card__text">
                    <h2 className='product-card__title'>{product.title}</h2>
                    <p className="product-card__desc">{product.description}</p>
                </div>
                <div className="seller">
                    <div className="seller-container">
                        <div className="seller__pic-container">
                            <img src="/img/userpicdefault.jpeg" alt="seller" className="seller__pic" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MatchCard
