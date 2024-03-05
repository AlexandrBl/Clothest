import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import '../scss/swipre.scss'

import { Navigation, Pagination, Keyboard, EffectCreative } from 'swiper/modules'
import { type ProductImage } from '../../Products/type'

export default function SwiperComponent ({ img }: { img: ProductImage[] }): JSX.Element {
  return (
    <>
    <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-20%', 0, -1]
          },
          next: {
            translate: ['100%', 0, 0]
          }
        }}
        modules={[Navigation, Pagination, Keyboard, EffectCreative]}
        className="mySwiper">

        {img.map(el => <SwiperSlide key={el.id}>{<img src={`/${el.path}`} alt={`photo-${el.id}`} className="product-pic" />}</SwiperSlide>)}

      </Swiper>
    </>
  )
}
