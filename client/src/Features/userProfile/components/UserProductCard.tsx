import React from 'react'
import { type UserProduct } from '../../Products/type'
import { useAppDispatch } from '../../../store/store'
import { userProductDelete } from '../../Products/productSlice'
import { useNavigate } from 'react-router-dom'
import SwiperComponent from '../../Swiper/Components/Swiper'
import { updateUser } from '../../Auth/authSlice'

function UserProductCard ({ userProduct }: { userProduct: UserProduct }): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  console.log(userProduct.id)

  const deleteProduct = (id: number): void => {
    dispatch(userProductDelete(id)).then((data) => {
      dispatch(updateUser(data.payload))
    }).catch(console.log)
  }

  const editProduct = (): void => {
    navigate(`${userProduct.id}/edit`)
  }

  return (
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
      </div>
    </div>
    </div>
  )
}

export default UserProductCard
