/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-24 22:31:57
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 23:02:37
 * @ Description: 轮播图模块
 */

import React from 'react'
import { Swiper, Image, ImageViewer } from 'antd-mobile'
import { houseSwiper1, houseSwiper2, houseSwiper3 } from '@/assets'

/** 轮播图模块 */
const HousesSwiper = React.memo(() => {
  const swiperImg = [houseSwiper1, houseSwiper2, houseSwiper3]

  const lookImage = (index) => {
    // 点击图片查看
    ImageViewer.Multi.show({ images: swiperImg, defaultIndex: index })
  }

  return (
    <Swiper loop autoplay style={{ '--height': '12rem' }}>
      {swiperImg.map((item, index) => (
        <Swiper.Item key={item} onClick={() => lookImage(index)}>
          <Image src={item} width="100%" height="100%" />
        </Swiper.Item>
      ))}
    </Swiper>
  )
})

HousesSwiper.displayName = 'HousesSwiper'

export default HousesSwiper
