import { useAppDispatch, type RootState } from '../../../store/store'

import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logoutFetch } from '../../Auth/api'
import { authLogout } from '../../Auth/authSlice'

function NavBar (): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useSelector((store: RootState) => store.auth.user)

  const logOut = (): void => {
    dispatch(authLogout()).catch(console.log)
    // localStorage.clear()
    navigate('/')
  }

  return (
    <nav className="nav">
      <ul className="nav__list list">

        {(user != null)
          ? <li className="nav__item">
            <button onClick={logOut} type='button' className='button logout-button'>
            LOGOUT
            </button>
        </li>
          : <li className="nav__item">
          <NavLink to={'/auth'} className={'nav__link link'}>

            AUTH

            </NavLink>
        </li>
      }
      </ul>
    </nav>
  )
}

export default NavBar
