export const initialShopState = {
    shopList: [],
    isLoading: false,
    error: null
}

export const reducerShop = (state=initialShopState, action) => {
    switch (action.type) {
        case 'SHOP_REQUEST':
            return { ...state, isLoading: true, error: null };
        case 'SHOP_SUCCESS':
    return { 
      ...state, 
      shopList: Array.isArray(action.payload) ? action.payload : [action.payload],
      isLoading: false, 
      error: null 
    };

        case 'SHOP_FAILURE':
            console.log(state)
            return { ...state, shopList: [], isLoading: false, error: action.payload }
        case 'SHOP_UPDATE': 
            return {...state, shopList: state.shopList.map((shop)=> shop.id === action.payload.id
            ? { ...shop, title: action.payload.newTitle } 
            : shop
        )}
        default:
            return state
    }
}