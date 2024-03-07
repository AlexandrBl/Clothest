import React from 'react'
import UserProductsList from './UserProductsList'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'

function UserPage (): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user)
  return (

    <div className='container '>
      <div className='userPage-container'>{`Привет, ${user?.name}!`}</div>
      <UserProductsList/>
    </div>
  )
}

export default UserPage
