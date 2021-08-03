import React from "react";
import {LoginForm} from "./LoginForm";
import {connect, useSelector} from "react-redux";
import {getCaptchaURL, login} from "../redux/auth-reducer";
import {LoginDataRequestType} from "../../api/Api";
import {AppStateType} from "../redux/redux-store";
import {Redirect} from "react-router-dom";

type MapDispatchPropsType = {
    login: (data: LoginDataRequestType) => void
}
type OwnPropsType = MapDispatchPropsType

const Login = (props: OwnPropsType) => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.data.isAuth)

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <>
        <h1>Login</h1>
        <LoginForm login={props.login} getCaptchaURL={getCaptchaURL}/>
    </>
}

export default connect(null, {login, getCaptchaURL})(Login)

