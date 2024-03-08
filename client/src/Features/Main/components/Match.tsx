import React from 'react'

function Match (): JSX.Element {
  return (
<>
      <div className='match-container'>
        <div className="notice-container"><h2 className='match-notice'>it's a match!</h2></div>
        <button className='match-container__button match-container__button_close'>Продолжить просмотр</button>
        <button className='match-container__button match-container__button_open'>Перейти в мэтчи</button>
    </div>
</>
  )
}

export default Match
