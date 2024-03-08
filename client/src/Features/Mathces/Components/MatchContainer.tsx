import React from 'react'
import { type Product } from '../../Products/type'
import MatchCard from './MatchCard'
import { useAppDispatch } from '../../../store/store'
import { checkChat } from '../../Chats/chatsSlice'
import { useNavigate } from 'react-router-dom'

export default function MatchContainer ({ matches }: { matches: Product[] }): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChatButton = (): void => {
    const userIds = matches.map((match) => match.userId)
    console.log(userIds)
    dispatch(checkChat(userIds)).catch(console.log)
    navigate('/matches/chats')
  }
  return (
    <>
    <div className='match-container__main'>
      <div className='match-container__main_cards'>
    {matches.map(el => <MatchCard product={el} key={el.id}/>)}
      </div>
    <button className='match-container__main_chatbutton button' onClick={handleChatButton}>Перейти в чат</button>
    </div>
    </>
  )
}
