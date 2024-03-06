import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Message from './Message'

const socket = io('ws://localhost:3000', { transports: ['websocket'] })

function Chat (): JSX.Element {
  const [messageText, setMessageText] = useState('')
  const [messagesHistory, setMessagesHistory] = useState<string[]>([])

  const sendMessage = (): void => {
    socket.emit('send_message', messageText)
  }

  useEffect(() => {
    const handleReceiveMessage = (data: string): void => {
      setMessagesHistory((prev) => [...prev, data])
    }
    socket.on('recieve_message', handleReceiveMessage)
    return () => {
      socket.off('recieve_message', handleReceiveMessage)
    }
  }, [])

  return (
    <div className='currentchat-container'>
      <div className='currentchat-container__title'>
        <p className='currentchat-container__title-text'>Chat 1</p>
      </div>
      <div className='chat-history-container'>
        {messagesHistory?.map((message, index) => <Message key={index} message={message} />)}
      </div>
      <div className='sendmessage-container'>
        <input className='sendmessage-container__input' placeholder='type message here...' value={messageText} onChange={(e) => { setMessageText(e.target.value) }}/>
        <button className='sendmessage-container__button' onClick={sendMessage}>Send message</button>
      </div>
    </div>
  )
}

export default Chat
