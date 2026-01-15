import { api } from '../../components/components-internetShop/axios-shopUser'

/* ---------- CART ---------- */

export const syncCart =
  (userId, cart) =>
  async dispatch => {
    if (!userId) return

    await api.patch(`/users/${userId}`, { cart })

    dispatch({
      type: 'AUTH_UPDATE_USER',
      payload: { cart }
    })
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

    const cart = user.cart.map(i =>
      i.id === productId
        ? { ...i, count: i.count - 1 }
        : i
    )

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

    const exists = user.favorites.some(i => i.id === product.id)

    const favorites = exists
      ? user.favorites.filter(i => i.id !== product.id)
      : [...user.favorites, product]

    await api.patch(`/users/${user.id}`, { favorites })

    dispatch({
      type: 'AUTH_UPDATE_USER',
      payload: { favorites }
    })
  }
