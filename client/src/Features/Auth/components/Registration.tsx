// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import type { SubmitHandler } from 'react-hook-form';
// import { useForm } from 'react-hook-form';
// import { object, ref, string } from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as api from '../api'
// import { useAppDispatch, type RootState } from '../../../store/store'
// import type { User } from '../type';
// import { authRegistration } from '../authSlice';

// const schema = object().shape({
//   name: string().required('Необходимо указать имя'),
//   email: string().required('Необходимо указать электронную почту'),
//   password: string()
//     .required('Необходимо указать пароль')
//     .min(8, 'Пароль должен быть более 8 символов')
//     .max(25, 'Пароль должен быть не более 25 символов'),
//   cpassword: string()
//     .required('Необходимо подтвердить пароль')
//     .min(8, 'Пароль должен быть более 8 символов')
//     .max(25, 'Пароль должен быть не более 25 символов')
//     .oneOf([ref('password')], 'Пароли не совпадают')
// })

// function Registration (): JSX.Element {
//   const dispatch = useAppDispatch()
//   const message = useSelector((store: RootState) => store.auth.message)

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<User>({
//     resolver: yupResolver(schema)
//   })

//   const registration: SubmitHandler<User> = (data: User) => {
//     dispatch(authRegistration(data)).catch(console.log)
//   }

//   return (
//     <div className='contAuth'>
//       <form onSubmit={handleSubmit(registration)}>
//         <input type='text' placeholder='name' {...register('name')} />
//         <span>{errors.name?.message}</span>
//         <input type='email' placeholder='email' {...register('email')} />
//         <span>{errors.email?.message}</span>
//         <input type='password' placeholder='password' {...register('password')} />
//         <span>{errors.password?.message}</span>
//         <input type='password' placeholder='cpassword' {...register('cpassword')} />
//         <span>{errors.cpassword?.message}</span>
//         <button type='submit'>registration</button>
//       </form>
//       <div className='errRega err' >{message}</div>
//     </div>
//   )
// }

// export default Registration
