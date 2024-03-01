import React, { useState } from 'react'
import { object, ref, string } from 'yup'
import Log from './Log'
import Reg from './Reg'
// import * as api from '../api'


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
  const [logReg, setLogReg] = useState(false)

  return (
<div className='container'>
 <div className='contAuth'>

 <button onClick={() => { setLogReg(true) }} className={logReg ? 'disabled' : ''} type='button'>reg</button>
 <button onClick={() => { setLogReg(false) }} className={logReg ? '' : 'disabled'} type='button' >log</button>

{ logReg &&
     <Reg></Reg>}

{ !logReg &&
<Log></Log>

}
      </div>
      </div>

  )
}

export default RegLog
