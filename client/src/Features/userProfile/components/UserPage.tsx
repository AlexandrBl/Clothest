import React from 'react'
import { NavLink } from 'react-router-dom'

function UserPage (): JSX.Element {
  return (

    <div className='container'>
      <NavLink to={'edit'}>Редактировать профиль</NavLink>
      <NavLink to={'myproducts'}>Мои товары</NavLink>
    </div>
  )
}

export default UserPage
