import React from 'react';
import logo from '../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {
    return (
        <header className='header'>
            <img src={logo} alt='Лого' className='logo' />

            <Switch>
                <Route exact path='/'>
                    <ul className='header__nav'>
                        <li className='header__nav_item header__link'>{props.userEmail}</li>
                        <li className='header__nav_item'><button onClick={props.signOut} className="header__link header__button_sign-out">Выйти</button></li>
                    </ul>
                </Route>

                <Route path='/signup'>
                    <Link to={`./signin`} className='header__link'>Войти</Link>
                </Route>

                <Route path='/signin'>
                    <Link to={`./signup`} className='header__link'>Регистрация</Link>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;
