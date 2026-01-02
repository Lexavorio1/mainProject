import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './App.module.css'

export const App = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'

  return (
    <div className={styles.container}>
      {/* Верхняя панель */}
      <header className={styles.header}>
        {!isHome && (
          <button
            className={styles.back}
            onClick={() => navigate(-1)}
          >
            ← Назад
          </button>
        )}
      </header>

      {/* Главная страница */}
      {isHome && (
        <div className={styles.menu}>
          <button onClick={() => navigate('/calculator')}>
            Калькулятор
          </button>

          <button onClick={() => navigate('/todos')}>
            Список задач
          </button>

          <button onClick={() => navigate('/tic')}>
            Крестики-нолики
          </button>

          <button onClick={() => navigate('/shop')}>
            Интернет-магазин
          </button>
        </div>
      )}

      {/* Контент */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
