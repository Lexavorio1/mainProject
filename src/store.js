import { createStore, applyMiddleware, combineReducers } from 'redux'
import { reducerTodos, reducerTic, reducerShop } from './reducers'
import { thunk } from 'redux-thunk'

const reducer = combineReducers({
    todosState: reducerTodos,
    ticState: reducerTic,
    shopState: reducerShop
})

export const store = createStore(reducer, applyMiddleware(thunk))