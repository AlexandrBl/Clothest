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
  const matches = useSelector((store: RootState) => store.matches.matches)

  const dispatch = useAppDispatch()

  /// /// Мэтчи для user 1
  useEffect(() => {
    if (messageMatch === 'matchanimation') {
      setIsMatchDivShown(true)
    }
  }, [messageMatch])

  useEffect(() => {
    if (messageMatch !== '') { dispatch(initMatch()).catch(console.log) }
  }, [messageMatch])

  /// ///// Init мэтч и user 2

  useEffect(() => {
    dispatch(initMatch()).catch(console.log)
  }, [])

  // const [matchesStatus, setMatchesStatus] = useState(false)
  // useEffect(() => {
  //   if (matches.length !== 0) {
  //     const matchesString = JSON.stringify(matches)
  //     localStorage.setItem('matches', matchesString)
  //   } else if (matches.length === 0) {
  //     localStorage.setItem('matches', '[]')
  //   }

  //   setInterval(() => {
  //     dispatch(initMatch()).then(() => {
  //       if (matches.length !== 0) {
  //         const matchesString = localStorage.getItem('matches')
  //         if (matchesString === null) {
  //           localStorage.setItem('matches', '[]')
  //         }

  //         if (matchesString !== null) {
  //           const matchesArray = JSON.parse(matchesString)
  //           console.log(matchesArray.length, matches.length, 1111111)

  //           if (matchesArray.length < matches.length) {
  //             console.log(2222222)
  //             console.log(matchesArray)
  //             setIsMatchDivShown(true)
  //             const matchesString = JSON.stringify(matches)
  //             localStorage.setItem('matches', matchesString)
  //           }
  //         }
  //       }
  //     }).catch(console.log)
  //   }, 5000)
  // }, [matchesStatus])

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
