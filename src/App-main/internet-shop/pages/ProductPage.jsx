import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DetailsShop } from '../../../forms/details-shop'
import { flattenShopList } from '../../../forms/details-shop/Flatten.shopList'
import { addReview } from '../../../actions'
import styles from './Pages.module.css'
import { useState } from 'react'

export const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const shopList = useSelector(s => s.shopState.shopList)
  const user = useSelector(s => s.authUserShopState.user)

  const product = flattenShopList(shopList).find(
    p => String(p.id) === id
  )

  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)

  if (!product) return <p>Товар не найден</p>

  /* ✅ Проверка — покупал ли пользователь */
  const hasBought = user?.orders?.some(
    o => o.productId === product.id
  )

  /* ✅ Отзывы других пользователей */
  const reviews = (product.reviews || []).filter(
    r => r.userId !== user?.id
  )

  const sendReview = () => {
    if (!text.trim()) return

    dispatch(
      addReview(product.id, {
        userId: user.id,
        text,
        rating,
        date: Date.now()
      })
    )

    setText('')
    setRating(10)
  }

  return (
    <div>

      <DetailsShop 
      product={product}
      onClick={() => navigate(-1)} />

      {/* ===== ОТЗЫВЫ ===== */}
      {reviews.length > 0 && (
        <section className={styles.reviews}>
          <h3>Отзывы покупателей</h3>

          {reviews.map((r, i) => (
            <div key={i} className={styles.reviewItem}>
              <div className={styles.reviewRating}>
                ⭐ {r.rating}/10
              </div>
              <p>{r.text}</p>
              <small>
                {new Date(r.date).toLocaleDateString()}
              </small>
            </div>
          ))}
        </section>
      )}

      {/* ===== ФОРМА ОТЗЫВА (ТОЛЬКО ЕСЛИ КУПИЛ) ===== */}
      {hasBought && (
        <section className={styles.reviewForm}>
          <h3>Оставить отзыв</h3>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Ваш отзыв"
          />

          <select
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <button className={styles.primaryBtn} onClick={sendReview}>
            Отправить отзыв
          </button>
        </section>
      )}
    </div>
  )
}
