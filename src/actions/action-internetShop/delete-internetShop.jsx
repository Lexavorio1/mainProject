export const deleteShopProductsAction = (id) => ({
    type: 'DELETE_SHOPPRODUCTS',
    payload: id
})
export const deleteShopUsersAction = (id) => ({
    type: 'DELETE_SHOPUSERS',
    payload: id
})

export const removeShopUsersCart = id => ({
  type: 'SHOPUSERS_REMOVE_CART',
  payload: id
})