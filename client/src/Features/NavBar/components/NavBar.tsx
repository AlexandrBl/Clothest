import { useAppDispatch, type RootState } from '../../../store/store'
import Modal from 'react-modal'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { authLogout } from '../../Auth/authSlice'
import RegLog from '../../Auth/components/RegLog'
import { clear } from '../../Products/productSlice'
import { clear2 } from '../../Products/matchSlice'
import { clear3 } from '../../Chats/chatsSlice'

function NavBar (): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)

  const user = useSelector((store: RootState) => store.auth.user)

  const logOut = (): void => {
    dispatch(authLogout()).catch(console.log)
    dispatch(clear())
    dispatch(clear2())
    dispatch(clear3())
    navigate('/')
  }

  return (
    <nav className="nav">
      <ul className="nav__list list">

        {(user != null)
          ? <>
          <li className="nav__item">
          <NavLink className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
  } to={'/favorites'}>Избранное</NavLink>
          </li>
          <li className="nav__item">
          <NavLink className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
  } to={'/newproduct'}>Разместить объявление</NavLink>
          </li>
          <li className="nav__item">
          <NavLink className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
  } to={'/matches'} >Matches</NavLink>
          </li>
          <li className="nav__item">
          <NavLink className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
  } to={'/profile'} >Profile</NavLink>
          </li>
          <li className="nav__item">
            <button onClick={logOut} type='button' className='button logout-button'>
            LOGOUT
            </button>
        </li>

        </>
          : <li className="nav__item">
                <button className='button auth-button' onClick={() => { setModal(true) }}>AUTH</button>
                <Modal ariaHideApp={false} className='modal' isOpen={modal} onRequestClose={() => { setModal(false) }}>
                  <button className='close-modal-auth__button' onClick={() => { setModal(false) }}>x</button>
                   <RegLog/>
                </Modal>
            </li>

      }

      </ul>
    </nav>
  )
}

export default NavBar
