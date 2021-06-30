import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.module.css';

type HeaderType = {
    isAuth: boolean
    isFetching: boolean
    data: {
        id: number | null
        email: string | null
        login: string | null
    }
}
const Header = (props: HeaderType) => {
    return (
        <header className={classes.header}>
            <img src='https://cdn.logo.com/hotlink-ok/logo-social.png'/>
            <div className={classes.login_block}>
                {props.isAuth ? props.data.login
                    : <NavLink to={'/login'}>Login</NavLink>
                } </div>
        </header>)
}
export default Header;