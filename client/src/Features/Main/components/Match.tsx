import React from 'react'

function Match (): JSX.Element {
  return (
<>
      <div className='match-container'>
        <h2 className='match-notice'>its a match</h2>
        <button className='match-container__button match-container__button_close'>Продолжить просмотр</button>
        <button className='match-container__button match-container__button_open'>Перейти в мэтчи</button>
    </div>
</>
  )
}

export default Match
