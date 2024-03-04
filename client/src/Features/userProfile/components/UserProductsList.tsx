import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, type RootState } from '../../../store/store'
import UserProductCard from './UserProductCard'
import { userProducts } from '../../Products/productSlice'

function UserProductsList (): JSX.Element {
  // const dispatch = useAppDispatch()
  const userProductsArray = useSelector((store: RootState) => store.products.userProducts)
  console.log(userProductsArray)

  // useEffect(() => {
  //   dispatch(userProducts()).catch(console.log)
  // }, [])
  //   const user = useSelector((store: RootState) => store.auth.user

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
