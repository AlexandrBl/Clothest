import React from 'react'
import { type Message } from '../type'

function MessageContainer ({ message }: { message: Message }): JSX.Element {
  return (
    <div className={`message-container__${message.author}`}>
    <div className='message-container'>
      <p className='message-container-text'>{message.text}</p>
    </div>

    </div>
  )
}

export default MessageContainer
