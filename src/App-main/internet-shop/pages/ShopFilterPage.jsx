import { useDispatch, useSelector } from 'react-redux'
import { setFilters, resetFilters } from '../../../actions'
import { useNavigate } from 'react-router-dom'

export const ShopFilterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const filters = useSelector(s => s.filters)

  const apply = () => {
    dispatch(setFilters(filters))
    navigate('/shop/filtered')
  }

  return (
    <div>
      <h2>Фильтры</h2>

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

      <label>
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
        value={filters.sort || ''}
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
          dispatch(setFilters({ minStars: Number(e.target.value) }))
        }
      >
        <option value="0">Любой рейтинг</option>
        <option value="3">⭐ 3+</option>
        <option value="4">⭐ 4+</option>
        <option value="5">⭐ 5</option>
      </select>

      <button onClick={apply}>Применить</button>
      <button onClick={() => dispatch(resetFilters())}>
        Сбросить
      </button>
    </div>
  )
}
