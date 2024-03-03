import { useAppDispatch, type RootState } from '../../../store/store'
import Modal from 'react-modal'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
// import { logoutFetch } from '../../Auth/api'
import { authLogout } from '../../Auth/authSlice'
import RegLog from '../../Auth/components/RegLog'
import UserProfile from '../../userProfile/components/userProfile'

function NavBar (): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)

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
          ? <><li>
          <NavLink to={'/profile'} >Profile</NavLink>
          </li>
          <li className="nav__item">
            <button onClick={logOut} type='button' className='button logout-button'>
            LOGOUT
            </button>
        </li>
        </>
          : <li className="nav__item">
                <button onClick={() => { setModal(true) }}>AUTH</button>
                <Modal className='modal' isOpen={modal} onRequestClose={() => { setModal(false) }}>
                  <button onClick={() => { setModal(false) }}>x</button>
                   <RegLog/>
                </Modal>
            </li>

      }
      </ul>
    </nav>
  )
}

export default NavBar
