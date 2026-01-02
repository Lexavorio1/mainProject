import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { axiosGetInternetShop } from '../../components/components-internetShop/axios-get-internetShop'
import styles from './InternetShop.module.css'

export const RoutingInternetShop = ({ searchValue }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { shopList, isLoading, error } = useSelector(s => s.shopState)

  useEffect(() => {
    if (!shopList?.length) {
      dispatch(axiosGetInternetShop())
    }
  }, [dispatch, shopList])

  const products = shopList?.[0] || {}

  const categoryNames = {
    videogames: 'Видеоигры',
    videocards: 'Видеокарты',
    appliances: 'Бытовая техника',
    headphones: 'Наушники'
  }

  /* ---------- ПОИСК ---------- */
  const flatItems = useMemo(() => {
    const arr = []

    Object.entries(products).forEach(([category, group]) => {
      if (Array.isArray(group)) {
        group.forEach(item =>
          arr.push({ ...item, __category: category })
        )
      } else {
        Object.entries(group).forEach(([brand, items]) => {
          items.forEach(item =>
            arr.push({
              ...item,
              __category: category,
              __brand: brand
            })
          )
        })
      }
    })

    return arr
  }, [products])

  const searchResults = useMemo(() => {
    if (!searchValue) return []
    const lower = searchValue.toLowerCase()
    return flatItems.filter(i =>
      i.name.toLowerCase().includes(lower)
    )
  }, [searchValue, flatItems])

  if (isLoading) return <p className={styles.loading}>Загрузка…</p>
  if (error) return <p className={styles.error}>Ошибка: {error}</p>

  /* ---------- ПОИСК ---------- */
  if (searchValue) {
    return (
      <div className={styles.block}>
        <h3>🔍 Результаты поиска</h3>

        <ul className={styles.grid}>
          {searchResults.map(item => {
            const finalPrice = item.discount
              ? Math.round(item.price * (1 - item.procent / 100))
              : item.price

            return (
              <li
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
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  /* ---------- КАТЕГОРИИ ---------- */
  return (
    <div className={styles.block}>
      <h3>Категории</h3>

      <div className={styles.grid}>
        {Object.keys(products).map(cat => (
          <button
            key={cat}
            className={styles.categoryBtn}
            onClick={() => navigate(`/shop/category/${cat}`)}
          >
            {categoryNames[cat] || cat}
          </button>
        ))}
      </div>
    </div>
  )
}
