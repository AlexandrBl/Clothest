import React from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import MatchesCard from './MatchContainer'
import { useNavigate } from 'react-router-dom'

export default function MatchesPage (): JSX.Element {
  const matches = useSelector((store: RootState) => store.matches.matches)
  const navigate = useNavigate()

  return (
    <div className='matches-chats-container'>
      <button className='matches-chats-container__button' onClick={() => { navigate('/matches/chats') }}>Чаты</button>
      <section className='matches'>
        <h2 className='matches__title'>{matches.length === 0 ? 'У вас нет мэтчей' : 'Ваши мэтчи'}</h2>
        {matches?.map((el, index) => <MatchesCard key={index} matches={el}/>) }
      </section>
    </div>

  )
}
