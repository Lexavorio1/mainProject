import { useState } from "react"
import { AppTodos, AppTic, AppCalc, AppInternetShop  } from "./App-main"
import styles from './App.module.css'

export const App = () => {
    const [todos, setTodos] = useState(false)
    const [tic, setTic] = useState(false)
    const [calc, setCalc] = useState(false)
    const [shop, setShop] = useState(false)

    return (
        <>
            {!todos && !tic && !calc && !shop &&(
                <div className={styles.conteiner}>
                    <button 
                        onClick={() => setTodos(true)}
                        className={styles.todos}
                    >
                        Список задач
                    </button>

                    <button
                        onClick={() => setTic(true)}
                        className={styles.tic}
                    >
                        Крестики-нолики
                    </button>
                    <button
                        onClick={() => setCalc(true)}
                        className={styles.tic}
                    >
                        Калькулятор
                    </button>
                    <button
                        onClick={() => setShop(true)}
                        className={styles.tic}
                    >
                        Интернет магазин
                    </button>
                </div>
            )}

            {todos && (
                <AppTodos onBack={() => setTodos(false)} />
            )}

            {tic && (
                <AppTic onBack={() => setTic(false)} />
            )}
            {calc && (
                <AppCalc onBack={() => setCalc(false)} />
            )}
            {shop && (
                <AppInternetShop onBack={() => setShop(false)} />
            )}
        </>
    )
}
