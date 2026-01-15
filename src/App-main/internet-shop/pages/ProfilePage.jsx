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

  const shopList = useSelector(s => s.shopState.shopList)

  useEffect(() => {
    if (!isAuth) navigate('/')
  }, [isAuth, navigate])

  if (!user) return <p>Загрузка...</p>

  const cart = Array.isArray(user.cart) ? user.cart : []
  const favorites = Array.isArray(user.favorites)
    ? user.favorites
    : []
  const orders = Array.isArray(user.orders) ? user.orders : []

  const getStock = id => {
    const all = Object.values(shopList?.[0] || {}).flatMap(
      group =>
        Array.isArray(group)
          ? group
          : Object.values(group).flat()
    )

    return all.find(p => p.id === id)?.amount ?? 0
  }

  const total = cart.reduce(
    (sum, i) =>
      sum + i.price * (1 - (i.procent || 0) / 100) * i.count,
    0
  )

  return (
    <div className={styles.profile}>
      <button
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>

      <h2>{user.firstName || user.login}</h2>

      {/* 🛒 КОРЗИНА */}
      <section>
        <h3>🛒 Корзина</h3>

        {cart.length ? (
          <>
            {cart.map(item => {
              const stock = getStock(item.id)

              return (
                <div key={item.id} className={styles.cartItem}>
                  <span
                    className={styles.itemLink}
                    onClick={() =>
                      navigate(`/shop/product/${item.id}`)
                    }
                  >
                    {item.name}
                  </span>

                  <div className={styles.counter}>
                    <button
                      onClick={() =>
                        dispatch(decrementCart(item.id))
                      }
                      disabled={item.count <= 1}
                    >
                      −
                    </button>

                    <span>{item.count}</span>

                    <button
                      onClick={() =>
                        dispatch(incrementCart(item.id))
                      }
                      disabled={item.count >= stock}
                    >
                      +
                    </button>
                  </div>

                  <span className={styles.price}>
                    {item.price *
                      (1 - (item.procent || 0) / 100) *
                      item.count}{' '}
                    ₽
                  </span>

                  <button
                    className={styles.removeBtn}
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    ✕
                  </button>
                </div>
              )
            })}

            <div className={styles.total}>
              Итого: {total} ₽
            </div>

            <button
              className={styles.buyBtn}
              onClick={() => navigate('/shop/order')}
            >
              Купить
            </button>
          </>
        ) : (
          <p className={styles.empty}>Корзина пуста</p>
        )}
      </section>

      {/* 📦 ИСТОРИЯ ПОКУПОК */}
      <section>
        <h3>📦 История покупок</h3>

        {orders.length ? (
          orders.map((order, idx) => (
            <div key={idx} className={styles.order}>
              <div className={styles.orderDate}>
                🕒 {order.date}
              </div>

              {/* 🔹 СТАРЫЙ ФОРМАТ */}
              {'productId' in order && (
                <div
                  className={styles.orderItem}
                  onClick={() =>
                    navigate(
                      `/shop/product/${order.productId}`
                    )
                  }
                >
                  <span className={styles.orderName}>
                    Товар #{order.productId}
                  </span>
                  <span>{order.price} ₽</span>
                </div>
              )}

              {/* 🔹 НОВЫЙ ФОРМАТ (на будущее) */}
              {Array.isArray(order.items) &&
                order.items.map(item => (
                  <div
                    key={item.id}
                    className={styles.orderItem}
                    onClick={() =>
                      navigate(
                        `/shop/product/${item.id}`
                      )
                    }
                  >
                    <span className={styles.orderName}>
                      {item.name}
                    </span>
                    <span>
                      {item.count} ×{' '}
                      {item.price *
                        (1 -
                          (item.procent || 0) / 100)}{' '}
                      ₽
                    </span>
                  </div>
                ))}

              {'total' in order && (
                <div className={styles.orderTotal}>
                  Итого: {order.total} ₽
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={styles.empty}>
            История покупок пока пуста
          </p>
        )}
      </section>

      {/* ❤️ ИЗБРАННОЕ */}
      <section>
        <h3>❤️ Избранное</h3>

        {favorites.length ? (
          favorites.map(item => (
            <div
              key={item.id}
              className={styles.cartItem}
              onClick={() =>
                navigate(`/shop/product/${item.id}`)
              }
            >
              {item.name}
            </div>
          ))
        ) : (
          <p className={styles.empty}>Пусто</p>
        )}
      </section>

      <button className={styles.logout} onClick={logout}>
        Выйти
      </button>
    </div>
  )
}
