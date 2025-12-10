import { useSelector } from 'react-redux';
import styles from './Field.module.css'

const selectInfo = (state)=> state.ticState

export const Info = () => {
  const { currentPlayer, isGameEnded, isDraw } = useSelector(selectInfo)
  if (isGameEnded) return <div className={styles.info}>Победитель: {currentPlayer}</div>
  if (isDraw) return <div className={styles.info}>Ничья!</div>;
  return <div className={styles.info}>Текущий ход: {currentPlayer}</div>
}