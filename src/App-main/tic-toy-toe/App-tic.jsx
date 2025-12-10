import styles from './App-tic.module.css'
import { Field, Info } from '../../components'
import { Restart } from '../../actions'
import { useDispatch } from 'react-redux'

export const AppTic = ({ onBack }) => {
    const dispatch = useDispatch()
    const restart = () => {
    dispatch(Restart())
  }

  return (

      <div className={styles.game}>
        <button className={styles.backButton} onClick={onBack}> ← Назад</button>
        <Info />
        <button onClick={restart}>Начать заново</button>
        <Field />
      </div>

  )
}