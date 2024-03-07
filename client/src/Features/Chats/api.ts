import type { Chat, ChatMessages } from './type'

export const initChatsFetch = async (): Promise<Chat[]> => {
  const res = await fetch('/api/chats')
  const data = await res.json()
  return data
}

export const updChatFetch = async (id: number): Promise<ChatMessages[]> => {
  const res = await fetch(`/api/chats/${id}/newmessages`)
  const data = await res.json()
  return data
}

export const chatCheckFetch = async (userIds: number[]): Promise<{ message: string }> => {
  const res = await fetch('/api/chats/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userIds })
  })
  const data = await res.json()
  return data
}
