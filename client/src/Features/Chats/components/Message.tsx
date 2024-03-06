import React from 'react'

function Message ({ message }: { message: string }): JSX.Element {
  return (
    <div className='message-container'>
      <p className='message-container-text'>{message}</p>
    </div>
  )
}

export default Message
