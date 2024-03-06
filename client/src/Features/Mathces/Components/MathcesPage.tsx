import React from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import MatchesCard from './MatchesCard'

export default function MatchesPage (): JSX.Element {
  const matches = useSelector((store: RootState) => store.matches.matches)

  return (
    <>
    {matches.map((el, index) => <MatchesCard key={index} matches={el}/>)}
    </>

  )
}
