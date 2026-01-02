import { useSelector } from 'react-redux'
import { applyFilters } from '../../../forms/details-shop/applyFilters'
import { useNavigate } from 'react-router-dom'

export const FilteredPage = () => {
  const navigate = useNavigate()
  const shop = useSelector(s => s.shopState.shopList?.[0])
  const filters = useSelector(s => s.filters)

  const products = Object.values(shop || {})
    .flatMap(c =>
      Array.isArray(c)
        ? c
        : Object.values(c).flat()
    )

  const filtered = applyFilters(products, filters)

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Назад</button>

      <h2>Результаты фильтра</h2>

      {filtered.map(p => (
        <div
          key={p.id}
          onClick={() => navigate(`/shop/product/${p.id}`)}
        >
          <h4>{p.name}</h4>
          <p>{p.price} ₽ ⭐ {p.stars}</p>
        </div>
      ))}
    </div>
  )
}
