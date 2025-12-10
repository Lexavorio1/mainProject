import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { axiosGetInternetShop } from '../../components/components-internetShop/axios-get-internetShop'
import { DetailsShop } from '../details-shop.jsx/details-shop'
import styles from './InternetShop.module.css'

export const RoutingInternetShop = ({ searchValue }) => {
  const dispatch = useDispatch()
  const shopState = useSelector(state => state.shopState)

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    dispatch(axiosGetInternetShop())
  }, [dispatch])

  const products = shopState.shopList?.[0] || {}

  // Плоский список для поиска
  const flatItems = useMemo(() => {
    const arr = []
    Object.entries(products).forEach(([category, group]) => {
      if (Array.isArray(group)) {
        group.forEach(item => arr.push({ ...item, __category: category, __subcategory: item.id }))
      } else {
        Object.entries(group).forEach(([sub, items]) => {
          items.forEach(item => arr.push({ ...item, __category: category, __subcategory: sub }))
        })
      }
    })
    return arr
  }, [products])

  const searchResults = useMemo(() => {
    if (!searchValue) return []
    const lower = searchValue.toLowerCase()
    return flatItems.filter(item => item.name.toLowerCase().includes(lower))
  }, [flatItems, searchValue])

  const categoryNames = {
    videocards: 'Видеокарты',
    videogames: 'Видеоигры',
    appliances: 'Бытовая техника',
    headphones: 'Наушники'
  }

  // fallback
  if (shopState.isLoading) return <div className={styles.loading}>Загрузка...</div>
  if (shopState.error) return <div className={styles.error}>Ошибка: {shopState.error}</div>
  if (!shopState.shopList?.length) return <div className={styles.empty}>Нет товаров</div>

  // --- JSX ---
  if (selectedProduct) {
    return <DetailsShop product={selectedProduct} onBack={() => setSelectedProduct(null)} />
  }

  if (searchValue) {
    return (
      <div>
        <h3>Результаты поиска: "{searchValue}"</h3>
        {searchResults.length === 0 ? (
          <div className={styles.empty}>Ничего не найдено</div>
        ) : (
          <ul className={styles.items}>
            {searchResults.map(item => (
              <li key={`${item.__category}-${item.id}`}>
                <button
                  className={styles.productButton}
                  onClick={() => setSelectedProduct(item)}
                >
                  {item.name} ({item.price || '-'})
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  if (!selectedCategory) {
    return (
      <div className={styles.categories}>
        <h3>Категории</h3>
        {Object.keys(categoryNames).map(cat => (
          <button
            key={cat}
            className={styles.categoryButton}
            onClick={() => {
              setSelectedCategory(cat)
              setSelectedSubcategory(null)
            }}
          >
            {categoryNames[cat]}
          </button>
        ))}
      </div>
    )
  }

  if (!selectedSubcategory) {
    const subcategories = Array.isArray(products[selectedCategory])
      ? products[selectedCategory].map(i => i.id)
      : Object.keys(products[selectedCategory])

    return (
      <>
        <button className={styles.backButtonSmall} onClick={() => setSelectedCategory(null)}>
          ← Назад к категориям
        </button>
        <h4>Подкатегории ({categoryNames[selectedCategory]})</h4>
        <ul className={styles.subcategories}>
          {subcategories.map(sub => (
            <li key={sub}>
              <button
                className={styles.productButton}
                onClick={() => setSelectedSubcategory(sub)}
              >
                {sub}
              </button>
            </li>
          ))}
        </ul>
      </>
    )
  }

  // товары выбранной подкатегории
  const items = Array.isArray(products[selectedCategory])
    ? products[selectedCategory]
    : products[selectedCategory][selectedSubcategory] || []

  return (
    <>
      <button className={styles.backButtonSmall} onClick={() => setSelectedSubcategory(null)}>
        ← Назад к подкатегориям
      </button>
      <h4>Товары ({selectedSubcategory})</h4>
      <ul className={styles.items}>
        {items.map(item => (
          <li key={item.id}>
            <button
              className={styles.productButton}
              onClick={() => setSelectedProduct(item)}
            >
              {item.name} ({item.price || '-'})
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
