import axios from 'axios'
import { UpdateDevProduct, DeleteDevProduct } from '../../actions'

export const updateProduct =
  (id, data) => async dispatch => {
    await axios.patch(
      `http://localhost:2026/products/${id}`,
      data
    )

    dispatch(UpdateDevProduct(id, data))
  }

export const deleteProduct =
  id => async dispatch => {
    await axios.delete(
      `http://localhost:2026/products/${id}`
    )

    dispatch(DeleteDevProduct(id))
  }
