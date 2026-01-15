import { Navigate } from 'react-router-dom'
import { useAuth } from '../../components'

export const RequireRole = ({ allow, children }) => {
  const { user, isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to="/shop/login" />
  }

  // ⛔ Бан
  if (user?.banUntil === 'permanent') {
    return <h2 style={{ padding: 20 }}>⛔ Вы забанены навсегда</h2>
  }

  // 🔇 Мут
  if (user?.muteUntil && Date.now() < user.muteUntil) {
    return <h2 style={{ padding: 20 }}>🔇 Вы временно замучены</h2>
  }

  // 🎭 Проверка роли
  if (!allow.includes(user.role)) {
    return <Navigate to="/shop" />
  }

  return children
}
