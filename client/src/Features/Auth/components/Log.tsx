/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, type RootState } from '../../../store/store'
import type { UserWithoutName } from '../type'
import { authLogin } from '../authSlice'
import { useNavigate } from 'react-router-dom'

const schema = object().shape({
  email: string().required('Необходимо указать электронную почту'),
  password: string()
    .required('Необходимо указать пароль')
})

function RegLog (): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const message = useSelector((store: RootState) => store.auth.message)
  const [viewMessage, setMessage] = useState('')

  useEffect(() => {
    if (message !== undefined) {
      setMessage(message)
    }
    setTimeout(() => { setMessage('') }, 1000)
  }, [message])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserWithoutName>({
    resolver: yupResolver(schema)
  })

  const login: SubmitHandler<UserWithoutName> = (data: UserWithoutName) => {
    dispatch(authLogin(data)).catch(console.log)

    if (data !== null) {
      navigate('/')
    }
  }

  return (
<>

<form onSubmit={handleSubmit(login)} className='form form-log'>
 <input type='email' placeholder='email' {...register('email')} className='form__input form-log__input'/>
 <span>{errors.email?.message}</span>
 <input type='password' placeholder='password' {...register('password')} className='form__input form-log__input'/>
 <span>{errors.password?.message}</span>
 <button type='submit' className='form__button form-log__button'>login</button>
 </form>
      <div className='form__err' >{viewMessage}</div>
</>

  )
}

export default RegLog
