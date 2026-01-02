import styles from './InternetShop.module.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAddShopUser, useAuth } from '../../components'
import { useSelector } from 'react-redux'

const passwordRules = yup
  .string()
  .min(8, 'Минимум 8 символов')
  .max(50, 'Максимум 50 символов')
  .matches(/[A-Z]/, 'Хотя бы одна заглавная буква')
  .matches(/[0-9]/, 'Хотя бы одна цифра')
  .matches(/[!@#$%^&*]/, 'Хотя бы один спецсимвол')

const schemaRegister = yup.object({
  firstName: yup.string().required('Имя обязательно'),
  lastName: yup.string().required('Фамилия обязательна'),
  age: yup.number().min(12, 'Минимум 12 лет'),
  login: yup.string().required('Логин обязателен'),
  password: passwordRules.required(),
  remember: yup.boolean()
})

const schemaLogin = yup.object({
  login: yup.string().required('Введите логин'),
  password: yup.string().required('Введите пароль'),
  remember: yup.boolean()
})

export const FormRegisterShop = ({ mode, close }) => {
  const schema = mode === 'login' ? schemaLogin : schemaRegister

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const users = useSelector(s => s.authUserShopState.usersList)
  const { addUser } = useAddShopUser()
  const { login } = useAuth()

  const onSubmit = async data => {
    const { remember, ...rest } = data

    if (mode === 'login') {
      const user = users.find(
        u => u.login === rest.login && u.password === rest.password
      )

      if (!user) {
        alert('Неверный логин или пароль')
        return
      }

      login(user, remember)
      close()
      return
    }

    const newUser = await addUser({
      ...rest,
      cart: [],
      favorites: [],
      orders: []
    })

    if (newUser) {
      login(newUser, remember)
      close()
    }
  }

  return (
    <div className={styles.registerWrapper}>
      <button className={styles.backButtonSmall} onClick={close}>
        ← Назад
      </button>

      <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>

        {mode === 'register' && (
          <>
            <input {...register('firstName')} placeholder="Имя" />
            <span>{errors.firstName?.message}</span>

            <input {...register('lastName')} placeholder="Фамилия" />
            <span>{errors.lastName?.message}</span>

            <input type="number" {...register('age')} placeholder="Возраст" />
            <span>{errors.age?.message}</span>
          </>
        )}

        <input {...register('login')} placeholder="Логин" />
        <span>{errors.login?.message}</span>

        <input type="password" {...register('password')} placeholder="Пароль" />
        {errors.password && (
          <div className={styles.errorList}>
            <span>{errors.password.message}</span>
          </div>
        )}

        <label>
          <input type="checkbox" {...register('remember')} /> Запомнить меня
        </label>

        <button type="submit">
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}
