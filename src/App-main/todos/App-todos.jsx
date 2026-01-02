import { useEffect, useState } from 'react'
import { axiosTodos, useAddTodoList } from '../../components'
import { UseTwoBtns } from '../../control-panel'
import { AddTodoListForm, Search } from '../../forms'
import styles from './App-main.module.css'
import { useDispatch, useSelector } from 'react-redux'

import { useIsMobile, FullTextModal } from "../../mobile"

export const AppTodos = () => {
  const dispatch = useDispatch()
  const { todoList, isLoading } = useSelector((state) => state.todosState)

  const isMobile = useIsMobile()

  const [showForm, setShowForm] = useState(false)
  const toggleFormVisibility = () => setShowForm(!showForm)

  const { onAdd } = useAddTodoList()

  const [searchPhrase, setSearchPhrase] = useState("")
  const [isSorted, setIsSorted] = useState(false)

  const [openedTodo, setOpenedTodo] = useState(null)

  const handleSearch = (value) => setSearchPhrase(value)

  /*const handleAddPerson = async (todo) => {
    onAdd(todo)
    setShowForm(false)
  }*/
  const handleAddPerson = async (title) => {
    onAdd(title)
    setShowForm(false)
  }

  const filteredTodos = todoList.filter(todo =>
    todo.title.toLowerCase().includes(searchPhrase.toLowerCase())
  )

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (isSorted) return a.title.localeCompare(b.title)
    return 0
  })

  const toggleSort = () => setIsSorted(!isSorted)

  const short = (text) => {
    if (!isMobile) return text
    return text.length > 60 ? text.slice(0, 60) + "..." : text
  }

  const openFull = (todo) => {
    if (!isMobile) return
    setOpenedTodo(todo)
  }

  const closeFull = () => setOpenedTodo(null)

  useEffect(() => {
    dispatch(axiosTodos())
  }, [dispatch])

  return (
    <div className={styles.app}>
      
      <h1 className={styles.title}>Задачи</h1>

      <div className={styles['btns-sort-add']}>
        <button className={styles.addButton} onClick={toggleFormVisibility}>
          {showForm ? 'Скрыть форму' : 'Добавить дело'}
        </button>

        <button onClick={toggleSort} className={styles.sortButton}>
          {isSorted ? 'Выключить сортировку' : 'Включить сортировку'}
        </button>
      </div>

      {showForm && (
        <div>
          <AddTodoListForm
            onAdd={handleAddPerson}
            onCancel={toggleFormVisibility}
          />
        </div>
      )}

      <Search onChange={handleSearch} />

      <ul className={styles.scroll}>
        {isLoading ? (
          <div className={styles.loader}>Загрузка...</div>
        ) : (
          sortedTodos.map(({ id, title }) => (
            <li className={styles.list} key={id}>
              <div
                className={styles.text}
                onClick={() => openFull({ id, title })}
                style={{ cursor: isMobile ? "pointer" : "default" }}
              >
                {short(title)}
              </div>

              {!isMobile && (
                <UseTwoBtns id={id} title={title} />
              )}
            </li>
          ))
        )}
      </ul>

      {openedTodo && (
        <FullTextModal title="Полный текст" onClose={closeFull}>
          <p>{openedTodo.title}</p>
          <UseTwoBtns id={openedTodo.id} title={openedTodo.title} />
        </FullTextModal>
      )}
    </div>
  )
}
