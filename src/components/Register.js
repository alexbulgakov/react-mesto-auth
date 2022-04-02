import React from 'react';
import FieldSet from './FieldSet';
import { Link } from "react-router-dom";

function Register(props) {
    return (
        <form className='registration'>
            <FieldSet
                id='form-registration'
                title='Регистрация'
                button='Зарегистрироваться'
                name='registration__form'
            >
                <input
                    name='email'
                    id='email-input'
                    placeholder='Email'
                    type='email'
                    className='registration__form-text'
                />
                <span className='popup__error'></span>
                <input
                    name='password'
                    id='password-input'
                    placeholder='Пароль'
                    type='password'
                    className='registration__form-text'
                />
                <span className='popup__error'></span>
            </FieldSet>
            <p>
                Уже зарегистрированы?{' '}
                <Link to='/signin' className='registration__form-login-button hover'>
                    Войти.
                </Link>
            </p>
        </form>
    );
}

export default Register;