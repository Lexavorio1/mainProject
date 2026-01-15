// reducers/reducer-shop.jsx

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

/* ===== SHOP REDUCER ===== */
export const reducerShop = (state = initialShopState, action) => {
  switch (action.type) {
    case 'SHOP_REQUEST':
      return { ...state, isLoading: true, error: null }

    case 'SHOP_SUCCESS':
      return {
        ...state,
        shopList: Array.isArray(action.payload)
          ? action.payload
          : [action.payload],
        isLoading: false,
        error: null
      }

    case 'SHOP_FAILURE':
      console.log(state)
      return { ...state, shopList: [], isLoading: false, error: action.payload }

    case 'SHOP_UPDATE':
      return {
        ...state,
        shopList: state.shopList.map(shop =>
          shop.id === action.payload.id
            ? { ...shop, title: action.payload.newTitle }
            : shop
        )
      }

      case 'ADD_REVIEW': {
  const { productId, review } = action.payload

  const shop = state.shopList[0]

  Object.values(shop).forEach(group => {
    if (Array.isArray(group)) {
      group.forEach(p => {
        if (p.id === productId) {
          p.reviews = [...(p.reviews || []), review]

          const ratings = [...(p.ratings || []), review.rating]
          p.ratings = ratings
          p.stars =
            ratings.reduce((s, r) => s + r, 0) / ratings.length
        }
      })
    } else {
      Object.values(group).forEach(items => {
        items.forEach(p => {
          if (p.id === productId) {
            p.reviews = [...(p.reviews || []), review]

            const ratings = [...(p.ratings || []), review.rating]
            p.ratings = ratings
            p.stars =
              ratings.reduce((s, r) => s + r, 0) / ratings.length
          }
        })
      })
    }
  })

  return { ...state }
}

    default:
      return state
  }
}

/* ===== AUTH REDUCER ===== */
export const authReducerShop = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'AUTH_GETUSERS':
      return { ...state, usersList: action.payload }

    case 'AUTH_LOGIN':
      return {
        ...state,
        user: { ...action.payload }, // ⬅️ КЛОНИРУЕМ
        isAuth: true
      }

    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }

    case 'AUTH_LOGOUT':
      return initialAuthState

    case 'USER_ROLE_UPDATED':
      return {
        ...state,
        usersList: state.usersList.map(u =>
          u.id === action.payload.id
            ? { ...u, role: action.payload.role }
            : u
        ),
        // если обновили самого себя — обновляем user
        user:
          state.user?.id === action.payload.id
            ? { ...state.user, role: action.payload.role }
            : state.user
      }

      case 'CREATE_ORDER': {
  const order = {
    id: 'order_' + Date.now(),
    date: Date.now(),
    items: action.payload.items,
    total: action.payload.total
  }

  return {
    ...state,
    user: {
      ...state.user,
      orders: [...(state.user.orders || []), order]
    }
  }
}

    case 'CLEAR_CART':
      return {
        ...state,
        user: {
          ...state.user,
          cart: []
        }
      }

    default:
      return state
  }
}

/* ===== FILTERS REDUCER ===== */
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
