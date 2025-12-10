export const axiosTodosSuccess = (todos) => ({
    type: 'TODOS_SUCCESS',
    payload: todos
})
export const axiosTodosError = (error) => ({
    type: 'TODOS_FAILURE',
    payload: error
})
export const axiosTodosSRequest = () => ({
    type: 'TODOS_REQUEST'
})