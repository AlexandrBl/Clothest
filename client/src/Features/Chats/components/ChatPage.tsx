import React, { useEffect } from 'react'
import ChatMainField from './ChatMainField'
import ChatList from './ChatList'
import { useSelector } from 'react-redux'
import { useAppDispatch, type RootState } from '../../../store/store'
import { initChats } from '../chatsSlice'

function ChatPage (): JSX.Element {
  const dispatch = useAppDispatch()

  const currentChat = useSelector((store: RootState) => store.chats.currentChat)

  useEffect(() => {
    dispatch(initChats())
      .catch(console.log)
  }, [])

  return (
    <div className='chats-container center-container'>
    <div className='chatslist-container'>
        <div className='chatlist-container__title'>
            <p className='chatlist-container__title_text'>Chats:</p>
        </div>
        <ChatList />
    </div>
     <ChatMainField currentChat={currentChat} />
    </div>
  )
}

export default ChatPage
