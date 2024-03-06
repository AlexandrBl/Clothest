import { type FullUser } from '../Products/type'

export interface StateChats {
  chats: Chat[]
  message: string | undefined
  currentChat: number | null
}

export interface Message {
  text: string
  author: string
}

export interface ChatMessages {
  id: number
  chatId: number
  authorId: number
  message: string
}

export type FullUserWithoutCity = Omit<FullUser, 'City'>

export interface Chat {
  id: number
  userId1: number
  userId2: number
  ChatMessages: ChatMessages[]
  User1?: FullUserWithoutCity
  User2?: FullUserWithoutCity
}
