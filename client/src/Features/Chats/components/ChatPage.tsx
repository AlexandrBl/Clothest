import React, { useEffect } from 'react'
import ChatMainField from './ChatMainField'
import ChatList from './ChatList'
import { useSelector } from 'react-redux'
import { useAppDispatch, type RootState } from '../../../store/store'
import { initChats } from '../chatsSlice'
import { useNavigate } from 'react-router'

function ChatPage (): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const currentChat = useSelector((store: RootState) => store.chats.currentChat)
  const chats = useSelector((store: RootState) => store.chats.chats)

  useEffect(() => {
    dispatch(initChats())
      .catch(console.log)
    setTimeout(async () => await dispatch(initChats())
      .catch(console.log), 3000)
  }, [])

  if (chats === null || chats === undefined) {
    return <div className='chats-container center-container'>Загружаем чаты... Надо чуть-чуть подождать</div>
  }

  return (
        <div className='chats-container center-container'>
          <button className='matches-chats-container__button matches-button' onClick={() => { navigate('/matches') }}>Мэчти</button>
      {chats?.length > 0
        ? (
        <>
          <div className='chatslist-container'>
            <div className='chatlist-container__title'>
              <p className='chatlist-container__title_text'>Список чатов</p>
            </div>
            <ChatList />
          </div>
          <ChatMainField currentChat={currentChat} />
          </>
          )
        : <div className='chatslist-nochats'>У вас нет ещё чатов😔</div>
      }
        </div>
  )
}

export default ChatPage
