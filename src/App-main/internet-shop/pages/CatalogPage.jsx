import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { applyFilters } from '../../../forms/details-shop/applyFilters'

export const CatalogPage = () => {
  const navigate = useNavigate()

  const shopList = useSelector(s => s.shopState.shopList)
  const filters = useSelector(s => s.filters)

  const filtered = useMemo(
    () => applyFilters(shopList, filters),
    [shopList, filters]
  )

  return (
    <div>
      <h2>Каталог</h2>

      {filtered.length ? (
        filtered.map(p => (
          <div
            key={p.id}
            onClick={() => navigate(`/shop/product/${p.id}`)}
          >
            {p.name} — {p.price} ₽ ⭐{p.stars}
          </div>
        ))
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  )
}
