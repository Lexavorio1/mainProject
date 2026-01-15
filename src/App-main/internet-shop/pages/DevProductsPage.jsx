import { useSelector, useDispatch } from 'react-redux'
import { UpdateDevProduct, DeleteDevProduct } from '../../../actions/action-internetShop/shopActions'
import shop from '../../App-main/internet-shop/App-shop.module.css'

export const DevPanelPage = () => {
  const products = useSelector(
    s => s.shopState.shopList
  )
  const dispatch = useDispatch()

  const update = (id, field, value) => {
    dispatch(UpdateDevProduct(id, { [field]: value }))
  }

  return (
    <div>
      <h2>🛠 Управление товарами</h2>

      {products.map(p => (
        <div key={p.id}>
          <b>{p.name}</b>

          <input
            type="number"
            defaultValue={p.price}
            onBlur={e =>
              update(p.id, 'price', e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Скидка %"
            defaultValue={p.procent || ''}
            onBlur={e =>
              update(p.id, 'procent', e.target.value)
            }
          />

          <button
            className={`${shop.shopBtn} ${shop.shopBtnDanger}`}
            onClick={() => dispatch(DeleteDevProduct(p.id))}
          >
            🗑 Удалить
          </button>
        </div>
      ))}
    </div>
  )
}
