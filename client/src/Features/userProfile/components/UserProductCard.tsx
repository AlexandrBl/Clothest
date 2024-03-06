import React from 'react'
import { type UserProduct } from '../../Products/type'
import { type RootState, useAppDispatch } from '../../../store/store'
import { userProductDelete } from '../../Products/productSlice'
import { useNavigate } from 'react-router-dom'
import SwiperComponent from '../../Swiper/Components/Swiper'
import { changeDefault, updateUser } from '../../Auth/authSlice'
import { useSelector } from 'react-redux'

function UserProductCard ({ userProduct }: { userProduct: UserProduct }): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useSelector((store: RootState) => store.auth.user)

  const deleteProduct = (id: number): void => {
    dispatch(userProductDelete(id)).then((data) => {
      dispatch(updateUser(data.payload))
    }).catch(console.log)
  }

  const editProduct = (): void => {
    navigate(`${userProduct.id}/edit`)
  }
  function changeCurrentProduct (defProd: string): void {
    if (user !== null) {
      dispatch(changeDefault({ defProd })).then((data) => {
        dispatch(updateUser(data.payload))
      }).catch(console.log)
    }
  }

  return (
    <>

    <div className="product-card-container">
    <div className="product-card">
    <div className="pic-container">
    <SwiperComponent img={userProduct.ProductImages}></SwiperComponent>
      </div>
      <div className="product-card__text">
      <h2 className='product-card__title'>{userProduct.title}</h2>
      <p className="product-card__desc">{userProduct.description}</p>
      <button onClick={() => { deleteProduct(userProduct.id) } } type='button'>Удалить</button>
      <button onClick={() => { editProduct() } }>Изменить</button>
      <button onClick={() => { changeCurrentProduct(userProduct.title) }} type='button' className='product-card__button product-card__switch-button'>Switch</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default UserProductCard
