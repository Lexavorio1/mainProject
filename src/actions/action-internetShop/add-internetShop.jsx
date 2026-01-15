export const addShopProductsAction = (id, title) => ({
    type: 'SHOPPRODUCTS_ADD',
    payload: { id, title }
})
export const addShopUsersAction = (id, title) => ({
    type: 'SHOPUSERS_ADD',
    payload: { id, title }
})


export const toggleShopUsersFavorites = product => ({
  type: 'SHOPUSERS_TOGGLE_FAVORITES',
  payload: product
})

export const addShopUsersCart = product => ({
  type: 'SHOPUSERS_ADD_CART',
  payload: product
})

export const incrementShopUsersCart = id => ({
  type: 'SHOPUSERS_INCREMENT_CART',
  payload: id
})

export const decrementShopUsersCart = id => ({
  type: 'SHOPUSERS_DECREMENT_CART',
  payload: id
})

