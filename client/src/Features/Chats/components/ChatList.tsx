import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, type RootState } from '../../../store/store'
import { switchChat } from '../chatsSlice'

function ChatList (): JSX.Element {
  const dispatch = useAppDispatch()
  const chats = useSelector((store: RootState) => store.chats.chats)

  const enterAnotherChat = (id: number): void => {
    dispatch(switchChat(id))
    // dispatch()
  }

  return (
    <div className='chatslist-container__list'>
       {chats.map((chat) =>
       <div key={chat.id} className='chatslist-container__list_element' onClick={() => { enterAnotherChat(chat.id) }}>
            <p className='chatslist-container__list_element-text'>{chat.User1?.name} hello {chat.User2?.name}</p>
        </div>
       )}
    </div>
  )
}

export default ChatList
