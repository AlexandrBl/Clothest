import { string } from 'yup'
import { type FullUser } from '../Products/type'
import type { UserWithoutName, UserAndCpassword, User } from './type'

export const registrationFetch = async (obj: UserAndCpassword): Promise<FullUser> => {
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

export const checkFetch = async (): Promise<{ user: FullUser | null }> => {
  const res = await fetch('/api/auth/check')
  const data = await res.json()
  return data
}

export const logFetch = async (obj: UserWithoutName): Promise<FullUser> => {
  const res = await fetch('/api/auth/log', {
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

export const logoutFetch = async (): Promise<User> => {
  const res = await fetch('api/auth/out')
  if (res.ok) {
    const data = await res.json()
    return data.user
  }
  const { message } = await res.json()
  throw message
}

export const changeDefaultProductFetch = async (obj: { defProd: string }): Promise <{ message: string, defaultProduct: string } > => {
  const res = await fetch('/api/auth/updDefault', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  if (res.ok) {
    const data = await res.json()
    console.log(data)
    return data
  }
  const { message } = await res.json()
  throw message
}
