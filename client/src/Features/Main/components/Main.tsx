import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import Match from './Match'
import MessageNotification from './MessageNotification'

function Main ({ isNotifyAlive }: { isNotifyAlive: boolean }): JSX.Element {
  const [isMatchDivShown, setIsMatchDivShown] = useState(false)
  const messageMatch = useSelector((store: RootState) => store.matches.message)
  const messageAuth = useSelector((store: RootState) => store.auth.message)
  const messageProducts = useSelector((store: RootState) => store.products.message)

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
      {isMatchDivShown && <Match />}
      {isNotifyAlive && <MessageNotification message={messageProducts} />}
    </main>
    </div>

    <div className="center-container">
    <Footer/>
    </div>
    </>
  )
}

export default Main
