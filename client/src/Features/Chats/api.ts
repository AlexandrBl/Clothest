import type { Chat } from './type'

export const initChatsFetch = async (): Promise<Chat[]> => {
  const res = await fetch('/api/chats')
  const data = await res.json()
  return data
}

export const updChatFetch = async (id: number): Promise<Chat[]> => {
  const res = await fetch(`/api/chats/${id}/newmessages`)
  const data = await res.json()
  return data
}
