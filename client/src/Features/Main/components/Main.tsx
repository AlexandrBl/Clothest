import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import Match from './Match'

function Main (): JSX.Element {
  const [isMatchDivShown, setIsMatchDivShown] = useState(false)
  const message = useSelector((store: RootState) => store.matches.message)

  useEffect(() => {
    console.log(message, 123456)

    if (message === 'matchanimation') {
      setIsMatchDivShown(true)
    }
  }, [message])

  return (
    <>
    <div className="center-container">
    <Header/>
    </div>

    <div className="center-container">
    <main className="main">
      <Outlet/>
      {isMatchDivShown && <Match />}
    </main>
    </div>

    <div className="center-container">
    <Footer/>
    </div>
    </>
  )
}

export default Main
