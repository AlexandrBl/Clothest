import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { useAppDispatch, type RootState } from '../../../store/store'
import Match from './Match'
import MessageNotification from './MessageNotification'
import Modal from 'react-modal'
import { clearMatchMessage, initMatch } from '../../Products/matchSlice'

function Main ({ isNotifyAlive }: { isNotifyAlive: boolean }): JSX.Element {
  const [isMatchDivShown, setIsMatchDivShown] = useState(false)
  const messageMatch = useSelector((store: RootState) => store.matches.message)
  const messageProducts = useSelector((store: RootState) => store.products.message)
  const dispatch = useAppDispatch()
  const matches = useSelector((store: RootState) => store.matches.matches)

  /// /// Мэтчи для user 2
  useEffect(() => {
    if (messageMatch === 'matchanimation') {
      setIsMatchDivShown(true)
    }
  }, [messageMatch])

  useEffect(() => {
    if (messageMatch !== '') { dispatch(initMatch()).catch(console.log) }
  }, [messageMatch])
  /// ////////////////

  /// ///// Init мэтч и user 2

  // useEffect(() => {
  //   if (localStorage.getItem('matches') === null) {
  //     dispatch(initMatch()).catch(console.log)
  //     if (matches.length !== 0) {
  //       const matchesJson = JSON.stringify(matches)
  //       localStorage.setItem('matches', matchesJson)
  //     } else if (matches.length === 0) {
  //       localStorage.setItem('matches', '[]')
  //     }
  //   }
  //   if (JSON.parse(localStorage.getItem('matches')).length !== 0) {
  //     console.log(1111111)

  //     dispatch(initMatch()).catch(console.log)
  //     setInterval(() => {
  //       dispatch(initMatch()).catch(console.log)
  //       const matchesJson = localStorage.getItem('matches')
  //       if (matchesJson !== null) {
  //         const matchesArray = JSON.parse(matchesJson)
  //         if (matchesArray.length < matches.length) {
  //           setIsMatchDivShown(true)
  //         }
  //       }
  //     }, 100000)
  //   }
  // }, [])
  /// ////////////////////////////

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
