import React from 'react';
import FieldSet from './FieldSet';

function Login(props) {

    return (
        <form className='registration'>
            <FieldSet
                id='form-registration'
                title='Вход'
                button='Войти'
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
        </form>
    );
}

export default Login;