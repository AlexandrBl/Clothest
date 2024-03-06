import React, { useEffect } from 'react'
import ChatMainField from './ChatMainField'
import ChatList from './ChatList'
import { useSelector } from 'react-redux'
import { useAppDispatch, type RootState } from '../../../store/store'
import { initChats } from '../chatsSlice'

function ChatPage (): JSX.Element {
  const dispatch = useAppDispatch()

  const currentChat = useSelector((store: RootState) => store.chats.currentChat)
  const chats = useSelector((store: RootState) => store.chats.chats)

  useEffect(() => {
    dispatch(initChats())
      .catch(console.log)
  }, [])

  return (
        <div className='chats-container center-container'>
      {chats?.length > 0
        ? (
        <>
          <div className='chatslist-container'>
            <div className='chatlist-container__title'>
              <p className='chatlist-container__title_text'>Chats:</p>
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
