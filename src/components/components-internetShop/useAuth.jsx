import { useDispatch, useSelector } from 'react-redux'
import { authLogin, authLogout } from '../../actions'
import { useEffect } from 'react'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isAuth } = useSelector(
    state => state.authUserShopState
  )

  /* ===== АВТОВХОД (ОДИН РАЗ) ===== */
  useEffect(() => {
    if (isAuth) return

    const saved =
      localStorage.getItem('authUser') ||
      sessionStorage.getItem('authUser')

    if (saved) {
      dispatch(authLogin(JSON.parse(saved)))
    }
  }, [dispatch, isAuth])

  /* ===== LOGIN ===== */
  const login = (userData, remember) => {
    dispatch(authLogin(userData))

    const storage = remember ? localStorage : sessionStorage
    const other = remember ? sessionStorage : localStorage

    storage.setItem('authUser', JSON.stringify(userData))
    other.removeItem('authUser')
  }

  /* ===== LOGOUT ===== */
  const logout = () => {
    dispatch(authLogout())
    localStorage.removeItem('authUser')
    sessionStorage.removeItem('authUser')
  }

  /* ===== АВТОРАЗБАН ===== */
  useEffect(() => {
    if (!user?.banUntil || user.banUntil === 'permanent') return

    if (Date.now() > user.banUntil) {
      const updatedUser = {
        ...user,
        banUntil: null,
        banReason: null,
        banBy: null
      }

      dispatch({
        type: 'AUTH_UPDATE_USER',
        payload: updatedUser
      })

      if (localStorage.getItem('authUser')) {
        localStorage.setItem(
          'authUser',
          JSON.stringify(updatedUser)
        )
      } else {
        sessionStorage.setItem(
          'authUser',
          JSON.stringify(updatedUser)
        )
      }
    }
  }, [user, dispatch])

  return { user, isAuth, login, logout }
}
