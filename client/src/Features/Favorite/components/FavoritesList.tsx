import React from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../store/store'
import FavoriteCard from './FavoriteCard'

function FavoritesList (): JSX.Element {
  const favorites = useSelector((store: RootState) => store.favorites.products)

  return (
    <section className='products'>
      <div className="products-container">
      <div className="products-inner-container">
      <div className="products__list">{
        favorites.length > 0
          ? favorites.map(el => <FavoriteCard favorite={el} key={el.id }/>
          )
          : <p>Тут пусто</p>
      }</div>
      </div>
      </div>
    </section>
  )
}

export default FavoritesList
