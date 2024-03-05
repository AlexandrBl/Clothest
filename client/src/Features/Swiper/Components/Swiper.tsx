import React, { useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import '../scss/swipre.scss'

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'

export default function SwiperComponent (img: ): JSX.Element {
  return (
    <>
    <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
       
      </Swiper>
    </>
  )
}
