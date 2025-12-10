export const initialState = {
    todoList: [],
    isLoading: false,
    error: null
}

export const reducerTodos = (state=initialState, action) => {
    switch (action.type) {
        case 'TODOS_REQUEST':
            return { ...state, isLoading: true, error: null };
        case 'TODOS_SUCCESS':
            return { ...state, todoList: action.payload, isLoading: false, error: null };
        case 'TODOS_FAILURE':
            return { ...state, todoList: [], isLoading: false, error: action.payload }
        case 'TODOS_UPDATE': 
            return {...state, todoList: state.todoList.map((todo)=> todo.id === action.payload.id
            ? { ...todo, title: action.payload.newTitle } 
            : todo
        )}
        case 'TODOS_ADD':
            return {...state, todoList: [...state.todoList, action.payload]}
        case 'DELETE_TODO':
        return {
          ...state,
          todoList: state.todoList.filter(todo => todo.id !== action.payload)}
        default:
            return state
    }
}