import React from 'react';

function Login(props) {
    const [values, setValues] = React.useState({ email: '', password: '' });
    const { email, password } = values;

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.handleLogin(email, password)
            .catch((err) => console.log(err))
    }

    return (
        <section className='authentication'>
            <form className='form form_type_login' onSubmit={handleSubmit} name='login'>
                <h2 className="form__title form__title_type_auth">Вход</h2>
                <fieldset className="form__container form__container_type_auth">
                    <input
                        name='email'
                        id='email-input'
                        placeholder='Email'
                        type='email'
                        className='form__input form__input_type_auth'
                        value={email || ''}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name='password'
                        id='password-input'
                        placeholder='Пароль'
                        type='password'
                        className='form__input form__input_type_auth'
                        value={password || ''}
                        onChange={handleChange}
                        required
                    />
                </fieldset>
                <button className="form__button form__button_type_submit-login" type="submit" name="submit" value='Войти'>Войти</button>
            </form>
        </section>
    );
}

export default Login;