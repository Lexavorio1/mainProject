export const initialShopState = {
    shopList: [],
    isLoading: false,
    error: null
}
const initialAuthState = {
  usersList: [],
  user: null,
  isAuth: false
}

const initialFiltersState = {
  priceFrom: '',
  priceTo: '',
  onlyDiscount: false,
  sort: null, // 'priceAsc' | 'priceDesc'
  minStars: 0
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

export const authReducerShop = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'AUTH_GETUSERS':
      return { ...state, usersList: action.payload }

    case 'AUTH_LOGIN':
      return { ...state, user: action.payload, isAuth: true }

    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }

    case 'AUTH_LOGOUT':
      return initialAuthState

    default:
      return state
  }
}

export const filtersReducer = (state = initialFiltersState, action) => {
  switch (action.type) {
    case 'FILTER_SET':
      return {
        ...state,
        ...action.payload
      }

    case 'FILTER_RESET':
      return initialFiltersState

    default:
      return state
  }
}