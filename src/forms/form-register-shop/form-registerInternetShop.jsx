import styles from './InternetShop.module.css'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form'

const fieldsScheme = yup.object().shape({
    login: yup.string()
        .matches(/^[\w_]*$/, 'Допустимы буквы, цифры и "_"')
        .max(20, 'Максимум 20 символов')
        .min(3, 'Минимум 3 символа')
})

export const FormRegisterShop = ({ setRegisterFormShop }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { login: '' },
        resolver: yupResolver(fieldsScheme),
    })

    const loginError = errors.login?.message

    const onSubmit = (formData) => {
        console.log(formData)
        setRegisterFormShop(true)
    }

    return (
        <div className={styles.registerForm}>

            <button
                className={styles.backButton}
                onClick={() => setRegisterFormShop(false)}
            >
                На главную
            </button>

            <form className={styles.formBlock} onSubmit={handleSubmit(onSubmit)}>

                {loginError && <div className={styles.error}>{loginError}</div>}

                <input
                    className={styles.input}
                    name="login"
                    type="text"
                    {...register('login')}
                    placeholder="Логин..."
                />

                <button
                    type="submit"
                    className={styles.submit}
                    disabled={!!loginError}
                >
                    Отправить
                </button>
            </form>
        </div>
    )
}

