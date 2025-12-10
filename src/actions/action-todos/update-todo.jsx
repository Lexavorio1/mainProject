export const updateTodo = (id, newTitle) => ({
    type: 'TODOS_UPDATE',
    payload: { id, newTitle }
})
