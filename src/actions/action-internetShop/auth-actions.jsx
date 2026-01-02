export const authLogin = (user) => ({
  type: 'AUTH_LOGIN',
  payload: user
})

export const authLogout = () => ({
  type: 'AUTH_LOGOUT'
})

export const axiosUsersShopSuccess = (users) => ({
  type: 'AUTH_GETUSERS',
  payload: users
})