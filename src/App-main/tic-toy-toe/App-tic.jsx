import styles from './App-tic.module.css'
import { Field, Info } from '../../components'
import { Restart } from '../../actions'
import { useDispatch } from 'react-redux'

export const AppTic = () => {
    const dispatch = useDispatch()
    const restart = () => {
    dispatch(Restart())
  }

  return (

      <div className={styles.game}>

        <Info />
        <button onClick={restart}>Начать заново</button>
        <Field />
      </div>

  )
}