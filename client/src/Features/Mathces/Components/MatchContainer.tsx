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
    <div style={{ backgroundColor: 'red', margin: '1rem' }}>
    {matches.map(el => <MatchCard product={el} key={el.id}/>)}
      <button onClick={handleChatButton}>Перейти в чат</button>
    </div>
    </>
  )
}
