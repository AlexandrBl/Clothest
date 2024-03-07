import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { type Product } from '../../Products/type'
import Selector from '../../Selector/Components/Selector'
import { delProd, dislikeProduct } from '../../Products/productSlice'
import { delFavProd } from '../../Favorite/favoriteSlice'
import { addMatch } from '../../Products/matchSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type RootState, useAppDispatch } from '../../../store/store'
import SwiperComponent from '../../Swiper/Components/Swiper'

function FavoriteCard ({ favorite }: { favorite: Product }): JSX.Element {
  const dispatch = useAppDispatch()

  const user = useSelector((store: RootState) => store.auth.user)
  const userProducts = useSelector((store: RootState) => store.products.userProducts)
  const navigate = useNavigate()

  const [sellerRate, setSellerRate] = useState('')
  const [currentProduct, setCurrentProduct] = useState('')
  const [modal, setModal] = useState(false)
  useEffect(() => {
    if (user !== null) {
      setCurrentProduct(user.defaultProduct)
    }
  }, [user])

  const changeCurrentProduct = (value: string): void => {
    setCurrentProduct(value)
  }

  const defaultProdChange = (): void => {
    if (userProducts.length > 0) {
      setModal(true)
    } else {
      navigate('newproduct')
    }
  }

  useEffect(() => {
    favorite.User.rating === 'Нет отзывов' ? setSellerRate('0') : setSellerRate(`${favorite.User.rating}`)
  }, [])

  const matchPost = (): void => {
    const userProduct = userProducts.find((product) => product.title === currentProduct)

    if (userProduct !== undefined) {
      dispatch(delProd(favorite.id))
      dispatch(delFavProd(favorite.id))
      const id = userProduct.id
      dispatch(addMatch({ productId1: id, productId2: favorite.id }))
        .catch(console.log)
    }
  }

  const dislike = (): void => {
    if (user !== null) {
      const id = favorite.id

      dispatch(dislikeProduct(id)).catch(console.log)
      dispatch(delFavProd(id))
      dispatch(delProd(id))
    }
  }

  return (
    <>

    <Modal ariaHideApp={false} className='selector-modal' isOpen={modal} onRequestClose={() => { setModal(false) }}>
      <button className='selector-button' onClick={() => { setModal(false) }}>x</button>
      <Selector currentProduct={currentProduct} changeCurrentProduct={changeCurrentProduct}/>
    </Modal>

    <div className="product-card-container">
    <div className="product-card">

      <p className="product-card__city">{favorite.User.City.name}</p>
      <div className="pic-container">
      <SwiperComponent img={favorite.ProductImages}></SwiperComponent>
      </div>
      <div className="product-card__text">
      <h2 className='product-card__title'>{favorite.title}</h2>
      <p className="product-card__desc">{favorite.description}</p>
      </div>
      {user !== null && <div className='product-card__select-container '>
      <button onClick={() => { defaultProdChange() }} type='button' className="selector__button">{`${currentProduct}`}</button>

    </div>}

      <button type='button' className='product-card__button product-card__like-button' onClick={matchPost}><svg className='svg svg__like' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 13.2871C14.0251 10.5713 11 12.5746 11 15.3995C11 17.9583 12.814 19.4344 14.3584 20.6912L14.4018 20.7265C14.5474 20.8449 14.6903 20.9615 14.829 21.0769C15.4 21.5523 15.95 22 16.5 22C17.05 22 17.6 21.5523 18.171 21.0769C19.7893 19.7296 22 18.2243 22 15.3995C22 14.4715 21.6735 13.6321 21.1474 13.0197C20.0718 11.7677 18.1619 11.4635 16.5 13.2871Z" />
      <path d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063C16.4998 0.825464 22 4.27416 22 9.1371C22 9.97067 21.8819 10.7375 21.6714 11.4477C20.9524 10.8701 20.051 10.5056 19.052 10.5C18.162 10.495 17.2936 10.7745 16.4988 11.3101C15.1099 10.3773 13.5429 10.2518 12.1698 10.9147C10.5345 11.7042 9.5 13.4705 9.5 15.3994C9.5 17.7046 10.6485 19.3217 11.8415 20.4937C10.8942 20.4184 9.94514 19.6861 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z" />
      </svg></button>
      <button type='button' onClick={dislike} className='product-card__button product-card__dislike-button'><svg className={'svg svg__dislike' }

xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" xmlSpace="preserve">
<path d="M7.402,32.471c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119 C0.734,8.485,5.936,2.306,13.159,2.306c4.51,0,8.271,2.369,10.555,5.966l-0.02-0.013L16.26,19.16l14.487,1.932L19.355,31.535 l8.447,5.279l-3.626,10.879L7.402,32.471z M49.496,20.97c-1.058,4.482-3.545,8.464-6.898,11.502L26.6,46.745l3.597-10.792 l-7.553-4.721l12.608-11.557L19.74,17.608l5.362-7.864c0.051-0.037,0.1-0.079,0.132-0.143c2.181-4.334,6.56-7.294,11.606-7.294 c7.223,0,12.425,6.179,13.079,13.543C49.92,15.85,50.273,17.679,49.496,20.97z"/>
</svg></button>

    </div>
    </div>
    </>

  )
}

export default FavoriteCard
