import React from 'react'
// import { useSelector } from 'react-redux'
// import { type RootState } from '../../../store/store'
import { NavLink } from 'react-router-dom'

function UserPage (): JSX.Element {
  // const products = useSelector((store: RootState) => store.products.products)
  // const user = useSelector((store: RootState) => store.auth.user)
  return (

    <div className='container'>
      <NavLink to={'edit'}>Редактировать профиль</NavLink>
      <NavLink to={'myproducts'}>Мои товары</NavLink>
    </div>
  )
}

export default UserPage
