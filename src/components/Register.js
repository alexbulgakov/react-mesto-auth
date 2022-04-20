import React from 'react';
import { Link } from "react-router-dom";

function Register(props) {
    const [values, setValues] = React.useState({ email: '', password: '' });
    const { email, password } = values;

    function handleSubmit(e) {
        e.preventDefault();
        props.handleRegister(email, password)
            .catch((err) => console.log(err))
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    return (
        <section className='authentication'>
            <form className='form form_type_register' name='register' onSubmit={handleSubmit}>
                <h2 className="form__title form__title_type_auth">Регистрация</h2>
                <fieldset className="form__container form__container_type_auth">
                    <input
                        name='email'
                        id='email-input'
                        placeholder='Email'
                        type='email'
                        className='form__input form__input_type_auth'
                        onChange={handleChange}
                        value={email || ''}
                        required
                    />
                    <input
                        name='password'
                        id='password-input'
                        placeholder='Пароль'
                        type='password'
                        className='form__input form__input_type_auth'
                        onChange={handleChange}
                        value={password || ''}
                        required
                    />
                </fieldset>
                <button
                    className="form__button form__button_type_submit-login"
                    type="submit"
                    name="submit"
                    value='Зарегистрироваться'
                >
                    Зарегистрироваться
                </button>
            </form>
            <p className='authentication__login-tip'>
                Уже зарегистрированы?{' '}
                <Link to='/signin' className='authentication__login-link'>
                    Войти.
                </Link>
            </p>
        </section>
    );
}

export default Register;