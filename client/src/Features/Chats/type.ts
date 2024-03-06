export interface StateChats {
  messagesHistory: Message[]
}

export interface Message {
  text: string
  author: string
}
