export const DeleteDevProduct = id => ({
    type: 'PRODUCT_DELETE',
    payload: id
})

export const UpdateDevProduct = (id, data) => ({
    type: 'PRODUCT_UPDATE',
      payload: { id, data }
})