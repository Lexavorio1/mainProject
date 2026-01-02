import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../../components'
import {
  incrementCart,
  decrementCart,
  removeFromCart
} from '../../../actions'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './Pages.module.css'

export const ProfilePage = () => {
  const { user, isAuth, logout } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const shop = useSelector(s => s.shopState.shopList?.[0])

  useEffect(() => {
    if (!isAuth) navigate('/')
  }, [isAuth, navigate])

  if (!user) return <p>Загрузка...</p>

  const getStock = id => {
    const all = Object.values(shop || {}).flatMap(g =>
      Array.isArray(g) ? g : Object.values(g).flat()
    )
    return all.find(p => p.id === id)?.amount ?? 0
  }

  const total = user.cart.reduce(
    (sum, i) =>
      sum + i.price * (1 - i.procent / 100) * i.count,
    0
  )

  return (
    <div className={styles.profile}>
      <button onClick={() => navigate(-1)}>← Назад</button>

      <h2>{user.firstName}</h2>

      <section>
        <h3>🛒 Корзина</h3>

        {user.cart.length ? (
          <>
            {user.cart.map(item => {
              const stock = getStock(item.id)

              return (
                <div key={item.id} className={styles.cartItem}>
                  <span>{item.name}</span>

                  <div className={styles.counter}>
                    <button
                      onClick={() => dispatch(decrementCart(item.id))}
                      disabled={item.count <= 1}
                    >
                      −
                    </button>

                    <span>{item.count}</span>

                    <button
                      onClick={() => dispatch(incrementCart(item.id))}
                      disabled={item.count >= stock}
                    >
                      +
                    </button>
                  </div>

                  <span>
                    {item.price * (1 - item.procent / 100) * item.count} ₽
                  </span>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ✕
                  </button>
                </div>
              )
            })}

            <div className={styles.total}>Итого: {total} ₽</div>
          </>
        ) : (
          <p>Корзина пуста</p>
        )}
      </section>

      <section>
        <h3>❤️ Избранное</h3>

        {user.favorites.length
          ? user.favorites.map(i => (
              <div className={styles.cartItem} key={i.id}>{i.name}</div>
            ))
          : <p>Пусто</p>}
      </section>

      <button onClick={logout}>Выйти</button>
    </div>
  )
}
