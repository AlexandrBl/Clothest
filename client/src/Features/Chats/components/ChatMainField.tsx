import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import MessageContainer from './MessageContainer'
import { type Message } from '../type'
import { type RootState } from '../../../store/store'
import { useSelector } from 'react-redux'

const socket = io('ws://localhost:4000', { transports: ['websocket'] })

function ChatMainField ({ currentChat }: { currentChat: number | null }): JSX.Element {
  const [messageText, setMessageText] = useState('')
  const [messagesHistory, setMessagesHistory] = useState<Message[]>([])

  const user = useSelector((store: RootState) => store.auth.user)
  const chats = useSelector((store: RootState) => store.chats.chats)
  const chat = currentChat !== null ? chats.find((el) => el.id === currentChat) : undefined

  useEffect(() => {
    if (chat !== undefined) {
      const messagesFromDb = chat.ChatMessages.map((chatMessage) => {
        if (chatMessage.authorId === user?.id) {
          return { text: chatMessage.message, author: 'me' }
        } else {
          return { text: chatMessage.message, author: 'roommate' }
        }
      })
      setMessagesHistory(messagesFromDb)
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
          <p className='currentchat-container__title-text'>Chat 1</p>
        </div>
        <div className='chat-history-container'>
          {messagesHistory?.map((message, index) => (
            <MessageContainer key={index} message={message} />
          ))}
        </div>
        <div className='sendmessage-container'>
          <input className='sendmessage-container__input' placeholder='type message here...' value={messageText} onChange={(e) => { setMessageText(e.target.value) }}/>
          <button className='sendmessage-container__button' onClick={sendMessage}>
            Send message
          </button>
        </div>
      </>)
      : (<p>no chat</p>)}
  </div>
  )
}

export default ChatMainField
