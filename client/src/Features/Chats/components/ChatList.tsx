import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, type RootState } from '../../../store/store'
import { switchChat, updateChat } from '../chatsSlice'

function ChatList (): JSX.Element {
  const dispatch = useAppDispatch()

  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const chats = useSelector((store: RootState) => store.chats.chats)
  const user = useSelector((store: RootState) => store.auth.user)

  const enterChat = (id: number): void => {
    dispatch(switchChat(id))
    dispatch(updateChat(id)).catch(console.log)
    setSelectedChat(id)
  }

  return (
    <div className='chatslist-container__list'>
       {chats.map((chat) =>
       <div key={chat.id} className={`chatslist-container__list_element ${selectedChat === chat.id ? 'selected-chat' : ''}`} onClick={() => { enterChat(chat.id) }}>
            <img className='chatslist-container__list_element-userpic' src={chat.User1?.id === user?.id ? chat.User2?.userpic : chat.User1?.userpic} />
            <div className='chatslist-container__list_element-userdata'>
            <p className='chatslist-container__list_element-name'>{chat.User1?.id === user?.id ? chat.User2?.name : chat.User1?.name }</p>
            <p className='chatslist-container__list_element-text'>{chat.ChatMessages[chat.ChatMessages.length - 1] !== undefined ? chat.ChatMessages[chat.ChatMessages.length - 1].message : 'Нет сообщений 😔'}</p>
            </div>
        </div>
       )}
    </div>
  )
}

export default ChatList
