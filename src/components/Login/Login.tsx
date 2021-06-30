import React from "react";
import {LoginForm} from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../redux/auth-reducer";
import {LoginDataRequestType} from "../../api/Api";
type MapDispatchPropsType = {
    login: (data: LoginDataRequestType) => void
}
type OwnPropsType =  MapDispatchPropsType

const Login = (props: OwnPropsType) => {
    const onSubmit = (formData: LoginDataRequestType)=>{
        debugger
        props.login(formData)
    }
    return <>
        <h1>Login</h1>
        <LoginForm onSubmit={onSubmit}/>
    </>
}

export default connect(null, {login})(Login)

