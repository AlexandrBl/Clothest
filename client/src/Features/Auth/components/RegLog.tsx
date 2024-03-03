import React, { useState } from 'react'
import Log from './Log'
import Reg from './Reg'

function RegLog (): JSX.Element {
  const [logReg, setLogReg] = useState(false)

  return (
<div className='container'>
 <div className='contAuth'>

 <button onClick={() => { setLogReg(true) }} className={logReg ? 'disabled' : ''} type='button'>reg</button>
 <button onClick={() => { setLogReg(false) }} className={logReg ? '' : 'disabled'} type='button' >log</button>

{ logReg &&
     <Reg/>}

{ !logReg &&
<Log/>}
      </div>
      </div>

  )
}

export default RegLog
