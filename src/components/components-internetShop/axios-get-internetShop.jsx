import axios from 'axios'
import {
  axiosShopSuccess,
  axiosUsersShopSuccess,
  axiosShopError,
  axiosShopRequest
} from '../../actions'

export const axiosGetInternetShop = () => async (dispatch) => {
  dispatch(axiosShopRequest())
  try {
    const response = await axios.get('http://localhost:2026/internet-shop')
    dispatch(axiosShopSuccess(response.data))
  } catch (error) {
    dispatch(axiosShopError(error.message))
  }
}

export const axiosGetUsersInternetShop = () => async (dispatch) => {
  dispatch(axiosShopRequest())
  try {
    const response = await axios.get('http://localhost:2026/users')
    dispatch(axiosUsersShopSuccess(response.data))
  } catch (error) {
    dispatch(axiosShopError(error.message))
  }
}
