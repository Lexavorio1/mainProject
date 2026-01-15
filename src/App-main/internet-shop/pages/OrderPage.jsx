import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './Pages.module.css'

export const OrderPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(s => s.authUserShopState.user?.cart || [])
  const [seconds, setSeconds] = useState(15)
  const created = useRef(false)

  useEffect(() => {
    if (!cart.length || created.current) return
    created.current = true

    const total = cart.reduce(
      (sum, i) => sum + i.price * (1 - i.procent / 100) * i.count,
      0
    )

    dispatch({
      type: 'CREATE_ORDER',
      payload: {
        items: cart.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          procent: i.procent,
          count: i.count
        })),
        total
      }
    })

    dispatch({ type: 'CLEAR_CART' })
  }, [cart, dispatch])

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
