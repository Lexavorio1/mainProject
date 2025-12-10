import styles from './Form.module.css'
import { useState } from 'react'

export const AddTodoListForm = ({ onAdd, onCancel }) => {
    const [todo, setTodo] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (todo.trim() === '') return
        onAdd(todo)
        setTodo('')
    }

    return (
        <div className={styles.modalOverlay}>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="todo">Дело:</label>
                    <input
                        type="text"
                        id="todo"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.btns}>
                  <button type="submit" className={styles.button}>Добавить</button>
                <button
                    type="button"
                    className={styles.button}
                    onClick={() => {
                        onCancel()
                        setTodo('')
                    }}
                >
                    Отмена
                </button>
                </div>
            </form>
        </div>
    )
}
