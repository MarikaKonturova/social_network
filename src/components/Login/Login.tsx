import React from "react";
import {LoginForm} from "./LoginForm";
import {connect, useSelector} from "react-redux";
import {login} from "../redux/auth-reducer";
import {LoginDataRequestType} from "../../api/Api";
import {AppStateType} from "../redux/redux-store";
import {Redirect} from "react-router-dom";
type MapDispatchPropsType = {
    login: (data: LoginDataRequestType) => void
}
type OwnPropsType =  MapDispatchPropsType

const Login = (props: OwnPropsType) => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    if(isAuth){
        return <Redirect to={'/profile'}/>
    }
    return <>
        <h1>Login</h1>
        <LoginForm login={props.login}/>
    </>
}

export default connect(null, {login})(Login)

