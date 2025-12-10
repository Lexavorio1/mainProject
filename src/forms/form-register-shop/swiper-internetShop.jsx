import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosGetInternetShop } from '../../components/components-internetShop/axios-get-internetShop'
import styles from './InternetShop.module.css'

export const SwiperInternetShop = ({ onSelectProduct }) => {
  const dispatch = useDispatch()
  const { shopList, isLoading, error } = useSelector(s => s.shopState)

  useEffect(() => {
    dispatch(axiosGetInternetShop())
  }, [dispatch])

  const products = shopList?.[0] || {}

  const discountItems = useMemo(() => {
    let arr = []

    Object.entries(products).forEach(([category, group]) => {
      if (Array.isArray(group)) {
        group.forEach(item => item.discount && arr.push({ ...item, __category: category }))
      } else {
        Object.values(group).forEach(items =>
          items.forEach(item => item.discount && arr.push({ ...item, __category: category }))
        )
      }
    })

    return arr
  }, [products])

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>
  if (!discountItems.length) return null

  return (
    <div style={{ position: "relative" }}>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={20}
        slidesPerView={3}
      >
        {discountItems.map(item => (
          <SwiperSlide key={item.id}>
            <div
              className={styles.swiperSlideContent}
              onClick={() => onSelectProduct(item)}
              style={{ cursor: 'pointer' }}
            >
              {item.img && <img src={item.img} alt={item.name} />}
              <h3>{item.name}</h3>
              {item.price && <p>Цена: {item.price} ₽</p>}
              {item.procent && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Скидка: {item.procent}%
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
