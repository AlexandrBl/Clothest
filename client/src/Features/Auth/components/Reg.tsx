import React from 'react'
import { useSelector } from 'react-redux'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { object, ref, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import * as api from '../api'
import { useAppDispatch, type RootState } from '../../../store/store'
import type { UserAndCpassword} from '../type'
import { authRegistration } from '../authSlice'

const schema = object().shape({
  name: string().required('Необходимо указать имя'),
  email: string().required('Необходимо указать электронную почту'),
  password: string()
    .required('Необходимо указать пароль')
    .min(8, 'Пароль должен быть более 8 символов')
    .max(25, 'Пароль должен быть не более 25 символов'),
  cpassword: string()
    .required('Необходимо подтвердить пароль')
    .min(8, 'Пароль должен быть более 8 символов')
    .max(25, 'Пароль должен быть не более 25 символов')
    .oneOf([ref('password')], 'Пароли не совпадают')
})

function RegLog (): JSX.Element {
  const dispatch = useAppDispatch()
  const message = useSelector((store: RootState) => store.auth.message)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserAndCpassword>({
    resolver: yupResolver(schema)
  })

  const registration: SubmitHandler<UserAndCpassword> = (data: UserAndCpassword) => {
    dispatch(authRegistration(data)).catch(console.log)
  }

  return (
<>
      <form onSubmit={handleSubmit(registration)} className='form form-reg'>
        <input type='text' placeholder='name' {...register('name')} className='form__input form-reg__input'/>
        <span>{errors.name?.message}</span>
        <input type='email' placeholder='email' {...register('email')} className='form__input form-reg__input'/>
        <span>{errors.email?.message}</span>
        <input type='password' placeholder='password' {...register('password')} className='form__input form-reg__input'/>
        <span>{errors.password?.message}</span>
        <input type='password' placeholder='cpassword' {...register('cpassword')} className='form__input form-reg__input'/>
        <span>{errors.cpassword?.message}</span>
        <button type='submit' className='form__button form-reg__button'>registration</button>
      </form>

      <div className='form__err' >{message}</div>
      </>

  )
}

export default RegLog
