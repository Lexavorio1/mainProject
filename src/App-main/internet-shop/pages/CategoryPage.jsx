import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './Pages.module.css'

export const CategoryPage = () => {
  const { category, brand } = useParams()
  const navigate = useNavigate()
  const products = useSelector(s => s.shopState.shopList?.[0])

  const data = products?.[category]
  if (!data) return <p>Категория не найдена</p>

  /* ---------- БРЕНДЫ ---------- */
  if (!brand) {
    return (
      <>
        <button onClick={() => navigate(-1)}>← Назад</button>
        <h3>{category}</h3>

        <div className={styles.grid}>
          {Object.keys(data).map(b => (
            <button
              key={b}
              className={styles.categoryBtn}
              onClick={() => navigate(`/shop/category/${category}/${b}`)}
            >
              {b}
            </button>
          ))}
        </div>
      </>
    )
  }

  /* ---------- ТОВАРЫ ---------- */
  const items = data[brand]

  return (
    <>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <h3>{brand}</h3>

      <div className={styles.grid}>
        {items.map(item => {
          const finalPrice = item.discount
            ? Math.round(item.price * (1 - item.procent / 100))
            : item.price

          return (
            <button
              key={item.id}
              className={styles.card}
              onClick={() => navigate(`/shop/product/${item.id}`)}
            >
              <h4>{item.name}</h4>

              {item.discount && (
                <span className={styles.oldPrice}>
                  {item.price} ₽
                </span>
              )}

              <span className={styles.price}>
                {finalPrice} ₽
              </span>
            </button>
          )
        })}
      </div>
    </>
  )
}
