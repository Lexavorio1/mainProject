import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPlayer } from '../../actions'
import styles from './Field.module.css'

const selectCells = (state) => state.ticState

export const Field = () => {
  const dispatch = useDispatch()
  const { cells, isGameEnded, isDraw } = useSelector(selectCells)
  const onCurrentPlayer = (index) => {
    dispatch(setCurrentPlayer(index))
  }
  return (
    <div className={styles.btns}>
      {cells.map((cell, index) => (
        <button
          key={index}
          onClick={() => onCurrentPlayer(index)}
          className={`${styles.btn} ${cell ? styles[`btn-${cell}`] : ''}`}
          disabled={cell || isGameEnded || isDraw}
        >
          {cell}
        </button>
      ))}
    </div>
  )
}
