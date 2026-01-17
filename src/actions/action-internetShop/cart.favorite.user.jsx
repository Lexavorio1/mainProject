import { api } from '../../components/components-internetShop/axios-shopUser'

/* ===== STORAGE SYNC ===== */
const syncStorageUser = user => {
  if (localStorage.getItem('authUser')) {
    localStorage.setItem('authUser', JSON.stringify(user))
  } else if (sessionStorage.getItem('authUser')) {
    sessionStorage.setItem('authUser', JSON.stringify(user))
  }
}

/* ---------- CART ---------- */

export const syncCart =
  (userId, cart) =>
  async (dispatch, getState) => {
    if (!userId) return

    await api.patch(`/users/${userId}`, { cart })

    const { user } = getState().authUserShopState
    const updatedUser = { ...user, cart }

    dispatch({
      type: 'AUTH_UPDATE_USER',
      payload: { cart }
    })

    syncStorageUser(updatedUser)
  }

export const incrementCart =
  productId =>
  (dispatch, getState) => {
    const { user } = getState().authUserShopState

    const cart = user.cart.map(i =>
      i.id === productId
        ? { ...i, count: i.count + 1 }
        : i
    )

    dispatch(syncCart(user.id, cart))
  }

export const decrementCart =
  productId =>
  (dispatch, getState) => {
    const { user } = getState().authUserShopState

    const cart = user.cart
      .map(i =>
        i.id === productId
          ? { ...i, count: i.count - 1 }
          : i
      )
      .filter(i => i.count > 0)

    dispatch(syncCart(user.id, cart))
  }

export const removeFromCart =
  productId =>
  (dispatch, getState) => {
    const { user } = getState().authUserShopState

    const cart = user.cart.filter(i => i.id !== productId)

    dispatch(syncCart(user.id, cart))
  }

/* ---------- FAVORITES ---------- */

export const toggleFavorite =
  product =>
  async (dispatch, getState) => {
    const { user } = getState().authUserShopState
    if (!user?.id) return

    const exists = user.favorites?.some(
      i => i.id === product.id
    )

    const favorites = exists
      ? user.favorites.filter(i => i.id !== product.id)
      : [...(user.favorites || []), product]

    await api.patch(`/users/${user.id}`, { favorites })

    const updatedUser = { ...user, favorites }

    dispatch({
      type: 'AUTH_UPDATE_USER',
      payload: { favorites }
    })

    syncStorageUser(updatedUser)
  }
