// import { deleteTodoAction } from "../actions";
import { axiosTodos } from './axios-getTodo'
// import axios from "axios";


/*export const onDelete = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:2025/todos/${id}`);
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        } finally {
            dispatch(deleteTodoAction(id))
        }
    };
};*/

export const onDelete = (id) => {
  return async (dispatch) => {
    try {
      const saved = JSON.parse(localStorage.getItem("todos") || "[]");

      const updated = saved.filter(todo => todo.id !== id);

      localStorage.setItem("todos", JSON.stringify(updated));

      dispatch(axiosTodos());

    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };
};