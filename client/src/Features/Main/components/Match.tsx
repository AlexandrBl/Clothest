import React from 'react'
import { Link } from 'react-router-dom'

function Match ({ setIsMatchDivShown }: { setIsMatchDivShown: (arg: boolean) => void }): JSX.Element {
  return (

      <div className='match-container'>
        <img className='match-gif' src="/img/match.gif" alt="gif" />
        <Link to='/matches'><div onClick={() => { setIsMatchDivShown(false) }} className="notice-container"><h2 className='match-notice'>it's a match!</h2></div></Link>
    </div>

  )
}

export default Match
