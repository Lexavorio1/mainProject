import { api } from '../components/components-internetShop/axios-shopUser'

const syncStorageUser = user => {
  if (localStorage.getItem('authUser')) {
    localStorage.setItem('authUser', JSON.stringify(user))
  } else if (sessionStorage.getItem('authUser')) {
    sessionStorage.setItem('authUser', JSON.stringify(user))
  }
}

export const updateUserRole =
  (userId, role) =>
  async (dispatch, getState) => {
    await api.patch(`/users/${userId}`, { role })

    const { user } = getState().authUserShopState

    // если обновляем самого себя
    if (user?.id === userId) {
      const updatedUser = { ...user, role }

      dispatch({
        type: 'AUTH_UPDATE_USER',
        payload: updatedUser
      })

      syncStorageUser(updatedUser)
    }

    dispatch({
      type: 'USER_ROLE_UPDATED',
      payload: { id: userId, role }
    })
  }