// import axios from "axios";
// import { updateTodo } from "../actions";
// import { todos } from './todos_server'
import { axiosTodos } from './axios-getTodo'

/*export const onUpdate = (id, newTitle) => {   
    return async (dispatch) => {
            try {
                await axios.put(`http://localhost:2025/todos/${id}`, {
                    title: newTitle
                });
            } catch (error) {
                console.error('Ошибка при обновлении:', error);
            } finally {
                dispatch(updateTodo(id, newTitle))
            }
        }
    };*/

export const onUpdate = (id, newTitle) => {
  return async (dispatch) => {
    try {
      const saved = JSON.parse(localStorage.getItem("todos") || "[]");

      const updated = saved.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );

      localStorage.setItem("todos", JSON.stringify(updated));

      dispatch(axiosTodos());

    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };
};