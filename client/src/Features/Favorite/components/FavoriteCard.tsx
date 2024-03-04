import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { type Product } from '../../Products/type'
import Selector from '../../Selector/Components/Selector'
import { delProd, dislikeProduct } from '../../Products/productSlice'
import { addMatch } from '../../Products/matchSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type RootState, useAppDispatch } from '../../../store/store'

function FavoriteCard ({ favorite }: { favorite: Product }): JSX.Element {
  const dispatch = useAppDispatch()

  const user = useSelector((store: RootState) => store.auth.user)
  const userProducts = useSelector((store: RootState) => store.favorites.products)
  const navigate = useNavigate()

  const [sellerRate, setSellerRate] = useState('')
  const [currentProduct, setCurrentProduct] = useState('')
  const [modal, setModal] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (user) {
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
    const userProduct = userProducts.find((favorite) => favorite.title === currentProduct)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (userProduct) {
      dispatch(delProd(favorite.id))
      const id = userProduct.id
      dispatch(addMatch({ productId1: id, productId2: favorite.id }))
        .catch(console.log)
    }
  }

  const dislike = (): void => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (user) {
      const id = favorite.id

      dispatch(dislikeProduct(id)).catch(console.log)
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
      <img src="/img/placeholder.jpeg" alt="placeholder" className="product-pic" />
      </div>
      <div className="product-card__text">
      <h2 className='product-card__title'>{favorite.title}</h2>
      <p className="product-card__desc">{favorite.description}</p>
      </div>
      {user !== null && <div className='product-card__select-container '>
      <button onClick={() => { defaultProdChange() }} type='button' className="selector__button">{`${currentProduct}`}</button>

    </div>}

      <button type='button' className='product-card__button product-card__like-button' onClick={matchPost}>Like</button>
      <button type='button' onClick={dislike} className='product-card__button product-card__dislike-button'>Dislike</button>

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

export default FavoriteCard
