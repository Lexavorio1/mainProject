import axios from 'axios';
import { axiosShopSuccess, axiosShopError, axiosShopRequest } from '../../actions'



export const axiosGetInternetShop = () => {
  return async (dispatch) => {
    dispatch(axiosShopRequest());
    try {
      const response = await axios.get(`http://localhost:2026/internet-shop`);
      dispatch(axiosShopSuccess(response.data));
    } catch (error) {
      dispatch(axiosShopError(error.message));
    }
  };
}