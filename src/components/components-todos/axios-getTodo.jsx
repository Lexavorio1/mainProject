/*import axios from 'axios';
import { axiosTodosSuccess, axiosTodosError, axiosTodosSRequest } from '../actions'



export const axiosTodos = () => {
  return async (dispatch) => {
    dispatch(axiosTodosSRequest());
    try {
      const response = await axios.get(`http://localhost:2025/todos`);
      dispatch(axiosTodosSuccess(response.data));
    } catch (error) {
      dispatch(axiosTodosError(error.message));
    }
  };
}*/

import { axiosTodosSuccess, axiosTodosError, axiosTodosSRequest } from '../../actions';
import { todos as serverTodos } from '../todos_server';

export const axiosTodos = () => {
  return async (dispatch) => {
    dispatch(axiosTodosSRequest());

    try {
      // 1. читаем localStorage
      const saved = JSON.parse(localStorage.getItem("todos"));

      let data;

      if (saved && Array.isArray(saved)) {
        // 2. если есть сохранённые — берём их
        data = saved;
      } else {
        // 3. если пусто — берём серверные todos
        data = serverTodos;

        // 4. и впервые записываем в localStorage
        localStorage.setItem("todos", JSON.stringify(serverTodos));
      }

      dispatch(axiosTodosSuccess(data));
      
    } catch (error) {
      dispatch(axiosTodosError(error.message));
    }
  };
};
