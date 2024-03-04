import React from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import UserProductCard from './UserProductCard'

function UserProductsList (): JSX.Element {
  const userProductsArray = useSelector((store: RootState) => store.products.userProducts)
  return (
    <>
    {userProductsArray.length > 0
      ? userProductsArray.map((userProduct) => <UserProductCard userProduct={userProduct} key={userProduct.id}/>)
      : <p>У вас пока нет товаров</p>
    }
    </>
  )
}

export default UserProductsList
