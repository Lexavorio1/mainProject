import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { applyFilters } from '../../../forms/details-shop/applyFilters'
import styles from './Pages.module.css'

export const ResultsPage = () => {
  const navigate = useNavigate()

  const shopList = useSelector(s => s.shopState.shopList)
  const filters = useSelector(s => s.filters)

  const filtered = useMemo(
    () => applyFilters(shopList, filters),
    [shopList, filters]
  )

  return (
    <div className={styles.page}>
      <h2>Результаты поиска</h2>

      {filtered.length ? (
        filtered.map(p => (
          <div
            key={p.id}
            className={styles.cartItem}
            onClick={() => navigate(`/shop/product/${p.id}`)}
          >
            <span className={styles.itemName}>{p.name}</span>
            <span className={styles.price}>{p.price} ₽</span>
            <span className={styles.stars}>⭐ {p.stars}</span>
          </div>
        ))
      ) : (
        <p className={styles.empty}>Ничего не найдено</p>
      )}
    </div>
  )
}
