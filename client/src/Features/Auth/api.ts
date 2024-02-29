import type { UserAndId, User, UserWithoutName, UserAndCpassword } from './type'

export const registrationFetch = async (obj: UserAndCpassword): Promise<UserAndId> => {
  const res = await fetch('/api/auth/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  if (res.ok) {
    const data = await res.json()
    return data.user
  }
  const { message } = await res.json()
  throw message
}

export const checkFetch = async (): Promise<{ user: UserAndId | null }> => {
  const res = await fetch('/api/auth/check')
  const data = await res.json()
  return data
}

export const logFetch = async (obj: UserWithoutName): Promise<{ message: string, user: UserAndId }> => {
  const res = await fetch('/api/auth/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  const data = await res.json()
  return data
}
