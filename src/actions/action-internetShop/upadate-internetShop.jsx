export const updateShop = (id, newTitle) => ({
    type: 'SHOP_UPDATE',
    payload: { id, newTitle }
})