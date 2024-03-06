import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { useAppDispatch, type RootState } from '../../../store/store'
import Match from './Match'
import MessageNotification from './MessageNotification'
import Modal from 'react-modal'
import { clearMatchMessage } from '../../Products/matchSlice'

function Main ({ isNotifyAlive }: { isNotifyAlive: boolean }): JSX.Element {
  const [isMatchDivShown, setIsMatchDivShown] = useState(false)
  const messageMatch = useSelector((store: RootState) => store.matches.message)
  // const messageAuth = useSelector((store: RootState) => store.auth.message)
  const messageProducts = useSelector((store: RootState) => store.products.message)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (messageMatch === 'matchanimation') {
      setIsMatchDivShown(true)
    }
  }, [messageMatch])

  return (
    <>
    <div className="center-container">
    <Header/>
    </div>

    <div className="center-container">
    <main className="main">
      <Outlet/>
      <Modal ariaHideApp={false} className='selector-modal' isOpen={isMatchDivShown} onRequestClose={() => {
        setIsMatchDivShown(false)
        dispatch(clearMatchMessage())
      }}>
      <Match />
    </Modal>
      {isMatchDivShown && <Match />}
      {isNotifyAlive && messageProducts !== undefined && <MessageNotification message={messageProducts} />}
    </main>
    </div>

    <div className="center-container">
    <Footer/>
    </div>
    </>
  )
}

export default Main
