import React, { useEffect, useState } from 'react'
import { type Product } from '../type'
import Selector from '../../Selector/Components/Selector'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import { type RootState, useAppDispatch } from '../../../store/store'
import { useNavigate } from 'react-router-dom'
import { addMatch } from '../matchSlice'
import { delProd, dislikeProduct } from '../productSlice'
import { delFavProd, newFavoriteProduct } from '../../Favorite/favoriteSlice'
import SwiperComponent from '../../Swiper/Components/Swiper'
import RegLog from '../../Auth/components/RegLog'

function ProductCard ({ product }: { product: Product }): JSX.Element {
  const dispatch = useAppDispatch()

  const user = useSelector((store: RootState) => store.auth.user)
  const userProducts = useSelector((store: RootState) => store.products.userProducts)
  const navigate = useNavigate()

  const [sellerRate, setSellerRate] = useState('')
  const [currentProduct, setCurrentProduct] = useState('')
  const [modal, setModal] = useState(false)
  const [modalReg, setModalReg] = useState(false)

  const modalChange = (): void => {
    if (user === null) {
      setModalReg(true)
    }
  }

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
    product.User.rating === 'Нет отзывов' ? setSellerRate('0') : setSellerRate(`${product.User.rating}`)
  }, [])

  const matchPost = (): void => {
    const userProduct = userProducts.find((product) => product.title === currentProduct)

    if (userProduct !== undefined && user?.defaultProduct !== 'Добавьте продукт') {
      dispatch(delProd(product.id))
      dispatch(delFavProd(product.id))
      const id = userProduct.id
      dispatch(addMatch({ productId1: id, productId2: product.id }))
        .catch(console.log)
    } else {
      navigate('newproduct')
    }
  }
  const newFavorite = (): void => {
    if (user != null) {
      dispatch(newFavoriteProduct({ idProduct: product.id, idUser: user.id })).catch(console.log)
    }
  }

  const dislike = (): void => {
    if (user !== null) {
      const id = product.id

      dispatch(dislikeProduct(id)).catch(console.log)
      dispatch(delProd(id))
      dispatch(delFavProd(id))
    }
  }

  return (
    <>
                <Modal ariaHideApp={false} className='modal' isOpen={modalReg} onRequestClose={() => { setModalReg(false) }}>
                  <button onClick={() => { setModalReg(false) }}>x</button>
                   <RegLog/>
                </Modal>

    <Modal ariaHideApp={false} className='selector-modal' isOpen={modal} onRequestClose={() => { setModal(false) }}>
      <button className='selector-button' onClick={() => { setModal(false) }}>x</button>
      <Selector currentProduct={currentProduct} changeCurrentProduct={changeCurrentProduct}/>
    </Modal>

    <div className="product-card-container">
    <div className="product-card">

      <p className="product-card__city">{product.User.City.name}</p>
      <div className="pic-container">
      <SwiperComponent img={product.ProductImages}></SwiperComponent>
      </div>
      <div className="product-card__text">
      <h2 className='product-card__title'>{product.title}</h2>
      <p className="product-card__desc">{product.description}</p>
      </div>
      {user !== null && <div className='product-card__select-container '>
      <button onClick={() => { defaultProdChange() }} type='button' className="selector__button">{`${currentProduct}`}</button>

    </div>}

      <button type='button' className='product-card__button product-card__fav-button' onClick={() => {
        newFavorite()
        modalChange()
      }}>Fav</button>
      <button type='button' className='product-card__button product-card__like-button' onClick={() => {
        matchPost()
        modalChange()
      }}>Like</button>
      <button type='button' onClick={() => {
        dislike()
        modalChange()
      }} className='product-card__button product-card__dislike-button'>Dislike</button>

      <div className="seller">
        <div className="seller-container">
        <p className="seller__rate">{sellerRate}</p>
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

export default ProductCard
