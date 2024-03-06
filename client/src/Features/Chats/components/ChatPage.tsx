import React from 'react'
import Chat from './Chat'

function ChatPage (): JSX.Element {
  return (
    <div className='chats-container center-container'>
    <div className='chatslist-container'>
        <div className='chatlist-container__title'>
            <p className='chatlist-container__title_text'>Chats:</p>
        </div>
        <div className='chatslist-container__list'>
            <div className='chatslist-container__list_element'>
                <p className='chatslist-container__list_element-text'>Chat1</p>
            </div>
            <div className='chatslist-container__list_element'>
                <p className='chatslist-container__list_element-text'>Chat2</p>
            </div>
            <div className='chatslist-container__list_element'>
                <p className='chatslist-container__list_element-text'>Chat3</p>
            </div>
        </div>
    </div>
    <Chat />
    </div>
  )
}

export default ChatPage
