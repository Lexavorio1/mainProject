import { useDispatch, useSelector } from 'react-redux'
import { setFilters, resetFilters } from '../../../actions'
import styles from './Pages.module.css'
import { useNavigate } from 'react-router-dom'

export const FilterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const filters = useSelector(s => s.filters)

  return (
    <div className={styles.filterPage}>
      <h2>Фильтр</h2>

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

      <select
        value={filters.minStars}
        onChange={e =>
          dispatch(setFilters({ minStars: Number(e.target.value) }))
        }
      >
        <option value={0}>Любой рейтинг</option>
        <option value={3}>3+</option>
        <option value={5}>5+</option>
        <option value={7}>7+</option>
      </select>

      <div className={styles.actions}>
        <button onClick={() => navigate('/shop/results')}>
          Применить
        </button>

        <button onClick={() => dispatch(resetFilters())}>
          Сброс
        </button>
      </div>
    </div>
  )
}
