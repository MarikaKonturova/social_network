import {Redirect} from "react-router-dom";
import React, {Component, ComponentType} from "react";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
type mapStateToPropsForRedirectType ={
    isAuth: boolean
}
const mapStateToPropsForRedirect = (state: AppStateType): mapStateToPropsForRedirectType => {
    return {
        isAuth: state.auth.data.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>){

    const RedirectComponent = (props: mapStateToPropsForRedirectType) => {
        let {isAuth, ...resProps } = {...props}
        if (!props.isAuth) return <Redirect to={"/login"}/>
        return <Component {...resProps as T}/>
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}