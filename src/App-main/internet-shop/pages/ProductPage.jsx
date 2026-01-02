import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DetailsShop } from '../../../forms/details-shop/details-shop' 

export const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const shop = useSelector(s => s.shopState.shopList?.[0])

  const all = Object.values(shop || {}).flatMap(g =>
    Array.isArray(g) ? g : Object.values(g).flat()
  )

  const product = all.find(p => String(p.id) === id)

  if (!product) return <p>Не найдено</p>

  return (
    <DetailsShop
      product={product}
      onBack={() => navigate(-1)}
    />
  )
}