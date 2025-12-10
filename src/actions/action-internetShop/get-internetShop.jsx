export const axiosShopSuccess = (shop) => ({
    type: 'SHOP_SUCCESS',
    payload: shop
})
export const axiosShopError = (errorShop) => ({
    type: 'SHOP_FAILURE',
    payload: errorShop
})
export const axiosShopRequest = () => ({
    type: 'SHOP_REQUEST'
})