import React, { useEffect, useState } from 'react'

import { type Product } from '../type'
import Selector from '../../Selector/Components/Selector'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import { type FullUser, type Product } from '../type'
import { useAppDispatch, type RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import Selector from '../../Selector/Selector'
import { addMatch } from '../matchSlice'

function ProductCard ({ product }: { product: Product }): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user)




  const [sellerRate, setSellerRate] = useState('')

  const [currentProduct, setCurrentProduct] = useState('')

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (user) {
      setCurrentProduct(user.defaultProduct)
    }
  }, [user])

  const changeCurrentProduct = (value: string): void => {
    setCurrentProduct(value)
  }

  const dispatch = useAppDispatch()
 
  const userProducts = useSelector((store: RootState) => store.products.userProducts)


  useEffect(() => {
    product.User.rating === 'Нет отзывов' ? setSellerRate('0') : setSellerRate(`${product.User.rating}`)
  }, [])


  const [modal, setModal] = useState(false)

  const matchPost = (): void => {
    dispatch(addMatch({ productId1: 8, productId2: product.id }))
      .catch(console.log)
  }


  return (
    <>

    <Modal ariaHideApp={false} className='selector-modal' isOpen={modal} onRequestClose={() => { setModal(false) }}>
      <button className='selector-button' onClick={() => { setModal(false) }}>x</button>
      <Selector currentProduct={currentProduct} changeCurrentProduct={changeCurrentProduct}/>
    </Modal>

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
      {user !== null && <div className='product-card__select-container '>
      <button onClick={() => { setModal(true) }} type='button' className="selector__button">{`Вы меняете: ${currentProduct}`}</button>

    </div>}

      <button type='button' className='product-card__button product-card__fav-button'>Fav</button>
      <button type='button' className='product-card__button product-card__like-button' onClick={matchPost}>Like</button>
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
