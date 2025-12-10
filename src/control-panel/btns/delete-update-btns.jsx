import { useDispatch } from "react-redux";
import { onUpdate, onDelete } from '../../components'
import styles from '../Control-panel.module.css'

export const UseTwoBtns = ({ id, title }) => {
    const dispatch = useDispatch()
    const onDeleteBtn = (id) => {
        dispatch(onDelete(id))
    }
    const onUpdateBtn = (id) => {
    const newTitle = prompt("Введите новый текст дела", title).trim()
    if (newTitle !== null) {
      dispatch(onUpdate(id, newTitle));
    }
  };

    return (
        <div className={styles.btns}>
            <button 
            onClick={()=>onDeleteBtn(id)}
            className={styles.delete}>✧ Удалить</button>
            <button 
            onClick={()=>onUpdateBtn(id, title)}
            className={styles.update}>✧ Изменить</button>
        </div>
    )
}