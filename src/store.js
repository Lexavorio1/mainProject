import { createStore, applyMiddleware, combineReducers } from 'redux'
import { 
    reducerTodos, 
    reducerTic, 
    reducerShop, 
    authReducerShop,
    filtersReducer 
} from './reducers'
import { thunk } from 'redux-thunk'

const reducer = combineReducers({
    todosState: reducerTodos,
    ticState: reducerTic,
    shopState: reducerShop,
    authUserShopState: authReducerShop,
    filters: filtersReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))