import styles from './Details.module.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components'
import { useDispatch } from 'react-redux'
import {
  toggleFavorite,
  syncCart
} from '../../actions'
import { isBanned } from '../../App-main/internet-shop/profile/others/punishment'

export const DetailsShop = ({ product }) => {
  const dispatch = useDispatch()
  const { isAuth, user } = useAuth()
  const navigate = useNavigate()

  if (!product) return null

  const banned = isBanned(user)

  const discountedPrice = product.discount
    ? Math.round(
        product.price * (1 - product.procent / 100)
      )
    : product.price

  const inCart = user?.cart?.some(
    i => i.id === product.id
  )
  const inFav = user?.favorites?.some(
    i => i.id === product.id
  )
  const isOut = product.amount === 0

  const addToCart = () => {
    if (!user || banned) return

    const exists = user.cart.find(
      i => i.id === product.id
    )

    const newCart = exists
      ? user.cart
      : [...user.cart, { ...product, count: 1 }]

    dispatch(syncCart(user.id, newCart))
  }

  return (
    <div className={styles.productDetail}>
      <button
        className={styles.backButtonSmall}
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>

      <h2>{product.name}</h2>

      {product.img && (
        <img
          src={product.img}
          alt={product.name}
          width="300"
          height="200"
        />
      )}

      <div className={styles.priceBlock}>
        {product.discount ? (
          <>
            <span className={styles.oldPrice}>
              {product.price} ₽
            </span>
            <span className={styles.discountPrice}>
              {discountedPrice} ₽
            </span>
          </>
        ) : (
          <span className={styles.discountPrice}>
            {product.price} ₽
          </span>
        )}
      </div>

      <p>{product.title}</p>

      {isAuth ? (
        <div className={styles.actions}>
          <button
            className={styles.primary}
            disabled={isOut || inCart || banned}
            onClick={addToCart}
          >
            {banned
              ? '⛔ Забанены'
              : isOut
              ? 'Нет на складе'
              : inCart
              ? 'В корзине'
              : 'В корзину'}
          </button>

          <button
            className={`${styles.heartButton} ${styles.secondary}`}
            onClick={() =>
              dispatch(toggleFavorite(product))
            }
          >
            {inFav ? '❤️' : '🤍'}
          </button>
        </div>
      ) : (
        <p>Войдите, чтобы добавить товар</p>
      )}
    </div>
  )
}
