import React, { useEffect, useState } from 'react'
import { type Product } from '../type'
import Selector from '../../Selector/Components/Selector'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import { type RootState, useAppDispatch } from '../../../store/store'
import { useNavigate } from 'react-router-dom'
import { addMatch } from '../matchSlice'
import { delProd, dislikeProduct } from '../productSlice'
import { delFavProd, newFavoriteProduct } from '../../Favorite/favoriteSlice'
import SwiperComponent from '../../Swiper/Components/Swiper'
import RegLog from '../../Auth/components/RegLog'

function ProductCard ({ product }: { product: Product }): JSX.Element {
  const dispatch = useAppDispatch()

  const [svg, setSvg] = useState(false)

  const user = useSelector((store: RootState) => store.auth.user)
  const userProducts = useSelector((store: RootState) => store.products.userProducts)
  const navigate = useNavigate()

  const [sellerRate, setSellerRate] = useState('')
  const [currentProduct, setCurrentProduct] = useState('')
  const [modal, setModal] = useState(false)
  const [modalReg, setModalReg] = useState(false)

  const modalChange = (): void => {
    if (user === null) {
      setModalReg(true)
    }
  }

  useEffect(() => {
    if (user !== null) {
      setCurrentProduct(user.defaultProduct)
    }
  }, [user])

  const changeCurrentProduct = (value: string): void => {
    setCurrentProduct(value)
  }

  const defaultProdChange = (): void => {
    if (userProducts.length > 0) {
      setModal(true)
    } else {
      navigate('newproduct')
    }
  }

  useEffect(() => {
    product.User.rating === 'Нет отзывов' ? setSellerRate('0') : setSellerRate(`${product.User.rating}`)
  }, [])

  const matchPost = (): void => {
    const userProduct = userProducts.find((product) => product.title === currentProduct)

    if (userProduct !== undefined && user?.defaultProduct !== 'Добавьте продукт') {
      dispatch(delProd(product.id))
      dispatch(delFavProd(product.id))
      const id = userProduct.id
      dispatch(addMatch({ productId1: id, productId2: product.id }))
        .catch(console.log)
    } else {
      navigate('newproduct')
    }
  }
  const newFavorite = (): void => {
    if (user != null) {
      dispatch(newFavoriteProduct({ idProduct: product.id, idUser: user.id })).catch(console.log)
    }
  }

  const dislike = (): void => {
    if (user !== null) {
      const id = product.id

      dispatch(dislikeProduct(id)).catch(console.log)
      dispatch(delProd(id))
      dispatch(delFavProd(id))
    }
  }

  return (
    <>
                <Modal ariaHideApp={false} className='modal' isOpen={modalReg} onRequestClose={() => { setModalReg(false) }}>
                  <button onClick={() => { setModalReg(false) }}>x</button>
                   <RegLog/>
                </Modal>

    <Modal ariaHideApp={false} className='selector-modal' isOpen={modal} onRequestClose={() => { setModal(false) }}>
      <button className='selector-button' onClick={() => { setModal(false) }}>x</button>
      <Selector currentProduct={currentProduct} changeCurrentProduct={changeCurrentProduct}/>
    </Modal>

    <div className="product-card-container">
    <div className="product-card">

      <p className="product-card__city">{product.User.City.name}</p>
      <div className="pic-container">
      <SwiperComponent img={product.ProductImages}></SwiperComponent>
      </div>
      <div className="product-card__text ">
      <h2 className='product-card__title'>{product.title}</h2>
      <p className="product-card__desc">{product.description}</p>
      </div>

      {user !== null && <div className='product-card__select-container '>
      <button onClick={() => { defaultProdChange() }} type='button' className="selector__button">{`${currentProduct}`}</button>

    </div>}

      <button type='button' className={svg ? ' product-card__fav-button product-card__fav-button-active' : 'product-card__button product-card__fav-button'} onClick={() => {
        newFavorite()
        modalChange()
        setSvg(true)
      }}><svg className={svg ? 'starActive svg svg__star' : 'svg svg__star' } version="1.1"
       viewBox="0 0 72 72" enableBackground="new 0 0 72 72" xmlSpace="preserve">
   <g>
     <g>
       <path d="M52.708,68.917c-1.102,0-2.197-0.273-3.17-0.795l-13.537-7.287L22.468,68.12c-2.194,1.17-4.944,1.012-6.964-0.373
         c-2.075-1.43-3.146-3.932-2.731-6.377l2.651-15.838L3.984,34.108c-1.758-1.75-2.353-4.288-1.551-6.623
         c0.798-2.314,2.817-3.978,5.271-4.342l15.562-2.313l6.759-14.033c1.089-2.256,3.435-3.713,5.976-3.713
         c2.543,0,4.888,1.458,5.974,3.713l6.761,14.033l15.56,2.314c2.452,0.363,4.473,2.025,5.272,4.338
         c0.801,2.34,0.207,4.877-1.549,6.627L56.575,45.532l2.654,15.84c0.411,2.445-0.66,4.947-2.729,6.373
         C55.376,68.512,54.066,68.917,52.708,68.917z M36.001,56.563c0.326,0,0.652,0.08,0.948,0.238l14.48,7.795
         c0.87,0.467,1.991,0.408,2.808-0.15c0.801-0.551,1.204-1.477,1.047-2.412L52.46,45.176c-0.106-0.639,0.102-1.289,0.56-1.746
         l12.174-12.153c0.665-0.663,0.892-1.619,0.591-2.495c-0.308-0.891-1.104-1.538-2.076-1.682L47.1,24.63
         c-0.655-0.097-1.221-0.513-1.508-1.11L38.371,8.533c-0.424-0.881-1.354-1.449-2.37-1.449s-1.947,0.569-2.374,1.45L26.41,23.52
         c-0.287,0.597-0.853,1.013-1.508,1.11L8.292,27.1c-0.958,0.143-1.772,0.804-2.077,1.687c-0.3,0.873-0.072,1.827,0.593,2.489
         L18.98,43.43c0.458,0.457,0.666,1.107,0.56,1.746l-2.822,16.857c-0.158,0.936,0.245,1.859,1.053,2.416
         c0.804,0.551,1.923,0.617,2.809,0.145l14.474-7.793C35.349,56.643,35.675,56.563,36.001,56.563z"/>
     </g>
     <g>
       <path d="M14.085,32.118c-0.481,0-0.906-0.349-0.986-0.84c-0.088-0.545,0.282-1.059,0.827-1.147l0.664-0.108
         c0.548-0.094,1.059,0.282,1.147,0.827c0.088,0.545-0.282,1.059-0.827,1.147l-0.664,0.108
         C14.193,32.114,14.138,32.118,14.085,32.118z M17.757,31.522c-0.47,0-0.889-0.332-0.98-0.811c-0.105-0.542,0.25-1.067,0.792-1.171
         l10.823-2.088l4.082-9.362c0.222-0.505,0.812-0.738,1.316-0.517c0.507,0.221,0.739,0.81,0.518,1.316l-4.293,9.845
         c-0.132,0.302-0.404,0.52-0.728,0.582l-11.34,2.188C17.883,31.517,17.82,31.522,17.757,31.522z"/>
     </g>
   </g>
   </svg></button>
      <button type='button' className='product-card__button product-card__like-button' onClick={() => {
        if (user !== null) {
          matchPost()
        }
        modalChange()
      }}><svg className={svg ? 'likeActive svg svg__like' : 'svg svg__like'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 13.2871C14.0251 10.5713 11 12.5746 11 15.3995C11 17.9583 12.814 19.4344 14.3584 20.6912L14.4018 20.7265C14.5474 20.8449 14.6903 20.9615 14.829 21.0769C15.4 21.5523 15.95 22 16.5 22C17.05 22 17.6 21.5523 18.171 21.0769C19.7893 19.7296 22 18.2243 22 15.3995C22 14.4715 21.6735 13.6321 21.1474 13.0197C20.0718 11.7677 18.1619 11.4635 16.5 13.2871Z" />
      <path d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063C16.4998 0.825464 22 4.27416 22 9.1371C22 9.97067 21.8819 10.7375 21.6714 11.4477C20.9524 10.8701 20.051 10.5056 19.052 10.5C18.162 10.495 17.2936 10.7745 16.4988 11.3101C15.1099 10.3773 13.5429 10.2518 12.1698 10.9147C10.5345 11.7042 9.5 13.4705 9.5 15.3994C9.5 17.7046 10.6485 19.3217 11.8415 20.4937C10.8942 20.4184 9.94514 19.6861 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z" />
      </svg></button>
      <button type='button' onClick={() => {
        dislike()
        modalChange()
      }} className= 'product-card__button  product-card__dislike-button ' >

<svg className={'svg svg__dislike' }

         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" xmlSpace="preserve">
        <path d="M7.402,32.471c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119 C0.734,8.485,5.936,2.306,13.159,2.306c4.51,0,8.271,2.369,10.555,5.966l-0.02-0.013L16.26,19.16l14.487,1.932L19.355,31.535 l8.447,5.279l-3.626,10.879L7.402,32.471z M49.496,20.97c-1.058,4.482-3.545,8.464-6.898,11.502L26.6,46.745l3.597-10.792 l-7.553-4.721l12.608-11.557L19.74,17.608l5.362-7.864c0.051-0.037,0.1-0.079,0.132-0.143c2.181-4.334,6.56-7.294,11.606-7.294 c7.223,0,12.425,6.179,13.079,13.543C49.92,15.85,50.273,17.679,49.496,20.97z"/>
</svg>
        </button>

      {/* <div className="seller">
        <div className="seller-container">
        <p className="seller__rate">{sellerRate}</p>
        <div className="seller__pic-container">
          <img src="/img/userpicdefault.jpeg" alt="seller" className="seller__pic" />
        </div>
        </div>
      </div> */}
    </div>
    </div>
    </>

  )
}

export default ProductCard
