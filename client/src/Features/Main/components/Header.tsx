import React from 'react'
import NavBar from '../../NavBar/components/NavBar'
import { Link } from 'react-router-dom'

function Header (): JSX.Element {
  return (
    <header className="header">

     <div className="center-container header-center-container">
<div className="header-container">
     <Link to={'/'} className={'logo-link link'}>
        <div className="logo">LOGO</div>
      </Link>
      <div className="search-form">SEARCH-FORM</div>
      <NavBar/>
     </div>
     </div>
    </header>
  )
}

export default Header
