import React, { useState } from 'react'

function MessageNotification ({ message }: { message: string }): JSX.Element {
  const [coverDiv, setCoverDiv] = useState(true)

  return (
    <>
    {coverDiv && <div className='statemessage-notification notification' onClick={() => { setCoverDiv(false) }}>
        <p className='statemessage-notification__text'>
            {message}
        </p>
    </div>}
    </>
  )
}

export default MessageNotification
