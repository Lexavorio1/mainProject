import { useDispatch, useSelector } from 'react-redux'
import { authLogin, authLogout } from '../../actions'
import { useEffect } from 'react'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isAuth } = useSelector(
    state => state.authUserShopState
  )

  /* ===== АВТОВХОД ===== */
  useEffect(() => {
    const savedUser =
      localStorage.getItem('authUser') ||
      sessionStorage.getItem('authUser')

    if (savedUser) {
      dispatch(authLogin(JSON.parse(savedUser)))
    }
  }, [dispatch])

  /* ===== LOGIN ===== */
  const login = (userData, remember) => {
    dispatch(authLogin(userData))

    if (remember) {
      localStorage.setItem('authUser', JSON.stringify(userData))
      sessionStorage.removeItem('authUser')
    } else {
      sessionStorage.setItem('authUser', JSON.stringify(userData))
      localStorage.removeItem('authUser')
    }
  }

  /* ===== LOGOUT ===== */
  const logout = () => {
    dispatch(authLogout())
    localStorage.removeItem('authUser')
    sessionStorage.removeItem('authUser')
  }

  return { user, isAuth, login, logout }
}
