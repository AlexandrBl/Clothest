import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar (): JSX.Element {
  return (
    <nav className="nav">
      <ul className="nav__list list">
        <li className="nav__item">
          <NavLink to={'/auth'} className={'nav__link link'}>AUTH</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
