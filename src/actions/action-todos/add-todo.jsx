export const addTodoAction = (id, title) => ({
    type: 'TODOS_ADD',
    payload: { id, title }
})