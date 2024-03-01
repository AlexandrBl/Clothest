import React from 'react'
import NavBar from '../../NavBar/components/NavBar'
import { NavLink } from 'react-router-dom'

function Header (): JSX.Element {
  return (
    <header className="header">
      <NavLink to={'/'} className={'logo-link link'}>
        <div className="logo">LOGO</div>
      </NavLink>
      <div className="search-form">SEARCH-FORM</div>
      <NavBar/>
    </header>
  )
}

export default Header
