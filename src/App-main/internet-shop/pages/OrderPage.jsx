import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../components/components-internetShop/axios-shopUser'
import styles from './Pages.module.css'

export const OrderPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(s => s.authUserShopState.user)
  const cart = user?.cart || []

  const [seconds, setSeconds] = useState(15)
  const created = useRef(false)

  useEffect(() => {
    if (!cart.length || created.current || !user) return
    created.current = true

    const total = cart.reduce(
      (sum, i) =>
        sum + i.price * (1 - i.procent / 100) * i.count,
      0
    )

    const order = {
      id: 'order_' + Date.now(),
      date: Date.now(),
      items: cart,
      total
    }

    const orders = [...(user.orders || []), order]

    api.patch(`/users/${user.id}`, {
      orders,
      cart: []
    })

    const updatedUser = {
      ...user,
      orders,
      cart: []
    }

    dispatch({
      type: 'AUTH_UPDATE_USER',
      payload: {
        orders,
        cart: []
      }
    })

    if (localStorage.getItem('authUser')) {
      localStorage.setItem('authUser', JSON.stringify(updatedUser))
    } else if (sessionStorage.getItem('authUser')) {
      sessionStorage.setItem(
        'authUser',
        JSON.stringify(updatedUser)
      )
    }
  }, [cart, user, dispatch])

  useEffect(() => {
    if (seconds <= 0) {
      navigate('/shop')
      return
    }

    const t = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds, navigate])

  return (
    <div className={styles.page}>
      <h2>📦 Заказ оформлен</h2>
      <p>
        {seconds > 0
          ? `Возврат в магазин через ${seconds} сек`
          : 'Готово'}
      </p>
    </div>
  )
}
