import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../components'
import {
  toggleFavorite,
  syncCart
} from '../../actions'
import { axiosGetInternetShop } from '../../components/components-internetShop/axios-get-internetShop'
import styles from './InternetShop.module.css'
import { isBanned } from '../../App-main/internet-shop/profile/others/punishment'

export const SwiperInternetShop = ({ onSelectProduct }) => {
  const dispatch = useDispatch()
  const { user, isAuth } = useAuth()
  const { shopList, isLoading, error } = useSelector(
    state => state.shopState
  )
  const banned = isBanned(user)

  useEffect(() => {
    dispatch(axiosGetInternetShop())
  }, [dispatch])

  const products = shopList?.[0] || {}

const addToCart = item => {
  if (!user || banned) return

  const exists = user.cart.some(i => i.id === item.id)

  const newCart = exists
    ? user.cart
    : [...user.cart, { ...item, count: 1 }]

  dispatch(syncCart(user.id, newCart))
}

  // товары со скидкой
  const discountItems = useMemo(() => {
    const arr = []

    Object.values(products).forEach(group => {
      if (Array.isArray(group)) {
        group.forEach(item => {
          if (item.discount && item.procent) arr.push(item)
        })
      } else {
        Object.values(group).forEach(items =>
          items.forEach(item => {
            if (item.discount && item.procent) arr.push(item)
          })
        )
      }
    })

    return arr
  }, [products])

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>
  if (!discountItems.length) return null

  return (
    <div className={styles.swiperWrapper}>
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        spaceBetween={20}
        slidesPerView={3}
      >
        {discountItems.map(item => {
          const inCart = user?.cart?.some(i => i.id === item.id)
          const inFav = user?.favorites?.some(i => i.id === item.id)

          const finalPrice = Math.round(
            item.price * (1 - item.procent / 100)
          )

          return (
            <SwiperSlide key={item.id}>
              <div
                className={styles.card}
                onClick={() => onSelectProduct(item)}
              >
                {/* ИКОНКИ */}
                {isAuth && (
                  <div
                    className={styles.cardActions}
                    onClick={e => e.stopPropagation()}
                  >
                    <button
  className={styles.iconBtn}
  title={
    banned ? 'Вы забанены' : 'В корзину'
  }
  disabled={banned}
  onClick={() => addToCart(item)}
>
                    {inCart ? '✅' : '🛒'}
                  </button>

                    <button
                      className={styles.iconBtn}
                      title="В избранное"
                      onClick={() =>
                        dispatch(toggleFavorite(item))
                      }
                    >
                      {inFav ? '❤️' : '🤍'}
                    </button>
                  </div>
                )}

                {item.img && (
                  <img
                    src={item.img}
                    alt={item.name}
                    className={styles.image}
                  />
                )}

                <h3 className={styles.title}>{item.name}</h3>

                <div className={styles.priceSteam}>
                  <div className={styles.discountPercent}>
                    −{item.procent}%
                  </div>

                  <div className={styles.priceBlock}>
                    <span className={styles.oldPrice}>
                      {item.price} ₽
                    </span>
                    <span className={styles.newPrice}>
                      {finalPrice} ₽
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
