import { useSelector } from 'react-redux'
import { applyFilters } from '../../../forms/details-shop/applyFilters'
import { useNavigate } from 'react-router-dom'

export const FilteredProductsPage = () => {
  const navigate = useNavigate()
  const shop = useSelector(s => s.shopState.shopList?.[0])
  const filters = useSelector(s => s.filters)

  const products = Object.values(shop || {})
    .flatMap(cat =>
      Array.isArray(cat)
        ? cat
        : Object.values(cat).flat()
    )

  const filtered = applyFilters(products, filters)

  return (
    <div>
      <h2>Результаты</h2>

      {filtered.length ? (
        filtered.map(p => (
          <div
            key={p.id}
            onClick={() => navigate(`/shop/details/${p.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <h4>{p.name}</h4>
            <p>{p.price} ₽ ⭐ {p.stars}</p>
          </div>
        ))
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  )
}
