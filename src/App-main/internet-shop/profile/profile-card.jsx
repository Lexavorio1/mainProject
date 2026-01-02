import { useState } from 'react'
import { useAuth } from '../../../components'
import { removeShopUsersCart } from '../../../actions'
import { useDispatch } from 'react-redux'
import styles from './profile-card.module.css'

export const ProfileCard = ({ onClose }) => {
  const { user, logout } = useAuth()
  const [tab, setTab] = useState('profile')
  const dispatch = useDispatch()

  if (!user) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.card}
        onClick={e => e.stopPropagation()}
      >
        <h3>{user.firstName} {user.lastName}</h3>
        <p className={styles.login}>@{user.login}</p>
<button className={styles.close} onClick={onClose}>✕</button>
        <div className={styles.tabs}>
            
          <button onClick={() => setTab('profile')}>Профиль</button>
          <button onClick={() => setTab('cart')}>Корзина</button>
          <button onClick={() => setTab('favorites')}>Избранное</button>
          <button onClick={() => setTab("orders")}>История</button>
        </div>

        <div className={styles.content}>
          {tab === 'profile' && <p>Роль: {user.role}</p>}
          {tab === 'cart' && (
  user.cart?.length
    ? user.cart.map(i => (
        <div key={i.id} style={{ display: 'flex', gap: 10 }}>
          <span>{i.name}</span>
          <button onClick={() => dispatch(removeShopUsersCart(i.id))}>
            ❌
          </button>
        </div>
      ))
    : <p>Корзина пуста</p>
)}
          {tab === 'favorites' && (
            user.favorites?.length
              ? user.favorites.map(i => <div key={i.id}>{i.name}</div>)
              : <p>Избранного нет</p>
          )}
          {tab === "orders" && ( 
            user.orders?.length ? user.orders.map(order => ( 
            <div key={order.id}> Заказ #{order.id} </div> )) 
          : 
          <p>История заказов пуста</p> )}
        </div>

        <button className={styles.logout} onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  )
}
