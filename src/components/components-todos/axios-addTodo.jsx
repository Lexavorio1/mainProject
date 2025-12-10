import { useState } from "react";
// import axios from "axios";

import { useDispatch } from "react-redux";
import { axiosTodos } from './axios-getTodo'



/*export const useAddTodoList = () => {
    const [isCreating, setIsCreating] = useState(false);
    const dispatch = useDispatch()
    
    const onAdd = async (title) => {
        setIsCreating(true);
        try {
            await axios.post('http://localhost:2025/todos', {
                title: title,
                completed: false
            });
            dispatch(axiosTodos());
        } catch (error) {
            console.error('Ошибка при добавлении:', error);
        } finally {
            setIsCreating(false);
            dispatch(axiosTodos())
        }
    };

    return {
        isCreating,
        onAdd,
    };
};*/

export const useAddTodoList = () => {
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useDispatch();

  const onAdd = async (title) => {
    setIsCreating(true);

    try {
      const saved = JSON.parse(localStorage.getItem("todos") || "[]");

      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
      };

      const updated = [...saved, newTodo];

      localStorage.setItem("todos", JSON.stringify(updated));

      dispatch(axiosTodos());

    } catch (error) {
      console.error("Ошибка при добавлении:", error);

    } finally {
      setIsCreating(false);
    }
  };

  return { isCreating, onAdd };
};