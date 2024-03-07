import React from 'react'
import { Link } from 'react-router-dom'

function IncorrectPage (): JSX.Element {
  return (
    <div className='incorrect-container center-container'>
      <p className='incorrect-container-p'>404</p>
      <p className='incorrect-container-p'>Страница не найдена 😔</p>
      <Link className='incorrect-container-link' to='/'>Вернуться на главную</Link>
    </div>
  )
}

export default IncorrectPage
