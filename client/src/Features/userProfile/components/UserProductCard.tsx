import React from 'react'
import { type UserProduct } from '../../Products/type'
import { useAppDispatch } from '../../../store/store'
import { userProductDelete } from '../../Products/productSlice'

function UserProductCard ({ userProduct }: { userProduct: UserProduct }): JSX.Element {
  const dispatch = useAppDispatch()

  const deleteProduct = (id: number): void => {
    dispatch(userProductDelete(id)).catch(console.log)
  }

  return (
    <div className="product-card-container">
    <div className="product-card">
    <div className="pic-container">
      <img src="/img/placeholder.jpeg" alt="placeholder" className="product-pic" />
      </div>
      <div className="product-card__text">
      <h2 className='product-card__title'>{userProduct.title}</h2>
      <p className="product-card__desc">{userProduct.description}</p>
      <button onClick={() => { deleteProduct(userProduct.id) } } type='button'>Удалить</button>
      <button >Изменить</button>
      </div>
    </div>
    </div>
  )
}

export default UserProductCard
