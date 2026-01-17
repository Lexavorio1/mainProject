import { Navigate } from 'react-router-dom'
import { useAuth } from '../../components'
import { isBanned, isMuted } from '../../App-main/internet-shop/profile/others/punishment'

export const RequireRole = ({ allow, children }) => {
  const { user, isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to="/shop/login" />
  }

  if (isBanned(user)) {
    return (
      <h2 style={{ padding: 20 }}>
        ⛔ Вы забанены
      </h2>
    )
  }

  if (isMuted(user)) {
    return (
      <h2 style={{ padding: 20 }}>
        🔇 Вы временно замучены
      </h2>
    )
  }

  if (!allow.includes(user.role)) {
    return <Navigate to="/shop" />
  }

  return children
}
