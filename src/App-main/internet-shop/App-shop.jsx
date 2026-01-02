import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../components'
import { setFilters, resetFilters } from '../../actions'
import { axiosGetUsersInternetShop } from '../../components'
import {
  SearchInternetShop,
  SwiperInternetShop,
  RoutingInternetShop
} from '../../forms'
import styles from './App-shop.module.css'

export const AppInternetShop = () => {
  const [search, setSearch] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuth } = useAuth()
  const filters = useSelector(s => s.filters)

  useEffect(() => {
    dispatch(axiosGetUsersInternetShop())
  }, [dispatch])

  const isShopHome = location.pathname === '/shop'

  return (
    <div className={styles.appShop}>
      {/* ===== TOP BAR ===== */}
      <header className={styles.topBar}>
        <div
          className={styles.logo}
          onClick={() => navigate('/shop')}
        >
          🛒 Internet Shop
        </div>

        <div className={styles.actions}>
          {!isAuth && (
            <>
              <button
                onClick={() => navigate('/shop/login')}
                className={styles.topBtn}
              >
                Войти
              </button>

              <button
                onClick={() => navigate('/shop/register')}
                className={styles.topBtnOutline}
              >
                Регистрация
              </button>
            </>
          )}

          {isAuth && (
            <button
              className={styles.profileBtn}
              onClick={() => navigate('/shop/profile')}
            >
              👤 {user.firstName}
            </button>
          )}
        </div>
      </header>
       {/* ===== FILTER PANEL ===== */}
       <button
  className={styles.filterToggle}
  onClick={() => setIsFilterOpen(prev => !prev)}
>
  ⚙️ Фильтр
</button>
      {isFilterOpen && (
  <div className={styles.filterDrawer}>
    <input
      placeholder="Цена от"
      value={filters.priceFrom}
      onChange={e =>
        dispatch(setFilters({ priceFrom: e.target.value }))
      }
    />

    <input
      placeholder="Цена до"
      value={filters.priceTo}
      onChange={e =>
        dispatch(setFilters({ priceTo: e.target.value }))
      }
    />

    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={filters.onlyDiscount}
        onChange={e =>
          dispatch(setFilters({ onlyDiscount: e.target.checked }))
        }
      />
      Только со скидкой
    </label>

    <select
      value={filters.sort}
      onChange={e =>
        dispatch(setFilters({ sort: e.target.value }))
      }
    >
      <option value="">Без сортировки</option>
      <option value="priceAsc">Цена ↑</option>
      <option value="priceDesc">Цена ↓</option>
    </select>

    <select
      value={filters.minStars}
      onChange={e =>
        dispatch(setFilters({ minStars: +e.target.value }))
      }
    >
      <option value={0}>Любой рейтинг</option>
      <option value={3}>⭐ 3+</option>
      <option value={4}>⭐ 4+</option>
      <option value={5}>⭐ 5</option>
    </select>

    <div className={styles.filterActions}>
      <button
        onClick={() => {
          navigate('/shop/filter')
          setIsFilterOpen(false)
        }}
      >
        Применить
      </button>

      <button onClick={() => dispatch(resetFilters())}>
        Сброс
      </button>
    </div>
  </div>
)}

      {/* ===== CONTENT ===== */}
      {isShopHome ? (
        <>
          <SearchInternetShop onChange={setSearch} />
          <SwiperInternetShop
            onSelectProduct={p => navigate(`/shop/product/${p.id}`)}
          />
          <RoutingInternetShop searchValue={search} />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  )
}
