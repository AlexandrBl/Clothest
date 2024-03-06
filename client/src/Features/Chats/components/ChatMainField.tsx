import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import MessageContainer from './MessageContainer'
import { type Message } from '../type'
import { useAppDispatch, type RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import { switchChat } from '../chatsSlice'

const socket = io('ws://localhost:4000', { transports: ['websocket'] })

function ChatMainField ({ currentChat }: { currentChat: number | null }): JSX.Element {
  const dispatch = useAppDispatch()
  const [messageText, setMessageText] = useState('')
  const [messagesHistory, setMessagesHistory] = useState<Message[]>([])

  const user = useSelector((store: RootState) => store.auth.user)
  const chats = useSelector((store: RootState) => store.chats.chats)
  const chat = currentChat !== null ? chats.find((el) => el.id === currentChat) : undefined

  if (currentChat === null) {
    dispatch(switchChat(chats[0].id))
  }

  useEffect(() => {
    if (chat !== undefined && chat.ChatMessages.length !== 0) {
      const messagesFromDb = chat.ChatMessages.map((chatMessage) => {
        if (chatMessage.authorId === user?.id) {
          return { text: chatMessage.message, author: 'me' }
        } else {
          return { text: chatMessage.message, author: 'roommate' }
        }
      })
      setMessagesHistory(messagesFromDb)
    }
    if (chat !== undefined && chat.ChatMessages.length === 0) {
      setMessagesHistory([])
    }
  }, [chat, user])

  const sendMessage = (): void => {
    socket.emit('send_message', { chatId: currentChat, authorId: user?.id, message: messageText })
    setMessagesHistory((prev) => [...prev, { text: messageText, author: 'me' }])
    setMessageText('')
  }

  useEffect(() => {
    const handleReceiveMessage = (data: Message): void => {
      setMessagesHistory((prev) => [...prev, data])
    }
    socket.on('recieve_message', handleReceiveMessage)
    return () => {
      socket.off('recieve_message', handleReceiveMessage)
    }
  }, [])

  return (
    <div className='currentchat-container'>
    {chat !== undefined
      ? (<>
        <div className='currentchat-container__title'>
          <p className='currentchat-container__title-text'>Чат с пользователем: {chat.User1?.id === user?.id ? chat.User2?.name : chat.User1?.name }</p>
        </div>
        <div className='chat-history-container'>
          {messagesHistory?.map((message, index) => (
            <MessageContainer key={index} message={message} />
          ))}
        </div>
        <div className='sendmessage-container'>
          <input className='sendmessage-container__input' placeholder='Просто начните печатать здесь...' value={messageText} onChange={(e) => { setMessageText(e.target.value) }}/>
          <button className='sendmessage-container__button' onClick={sendMessage}>
            Отправить
          </button>
        </div>
      </>)
      : (<p>Откройте чат</p>)}
  </div>
  )
}

export default ChatMainField
