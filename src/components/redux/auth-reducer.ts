import {authAPI, LoginDataRequestType} from "../../api/Api";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'SET-USER-DATA'


type setUserAT = {
    type: typeof SET_USER_DATA
    data: {
        id: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    }
    resultCode?: number
    messages?: Array<string>
}

type AuthReducerAT = setUserAT

export type AuthReducerType ={
    isFetching: boolean,
    data: {
        id: null | number,
        email: null | string,
        login: null | string,
    },
    isAuth: boolean,
    appInitialized: boolean
}
let initialState: AuthReducerType = {
    isFetching: false,
    data: {
        id: null,
        email: null,
        login: null
    },
    isAuth: false,
    appInitialized: false
}


const authReducer = (state: AuthReducerType = initialState, action: AuthReducerAT): AuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA: {

            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        }
        default:
            return state;
    }
}
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setUserAT => {
    return {
        type: SET_USER_DATA,
        data: {
            id,
            email,
            login,
            isAuth
        }
    }
}
export const getAuthUserData = ()=>(dispatch: Dispatch)=>{
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {userId, login, email} = response.data.data;
            dispatch(setUserData(userId, login, email, true));
        }
    }).finally(() => {})
}
export const login = (data: LoginDataRequestType)=>(dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>)=>{
    debugger
    authAPI.login(data).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        }
    }).finally(() => {})
}
export const logout = ()=>(dispatch: Dispatch<ActionsType>)=>{
    authAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
        }
    }).finally(() => {})
}

type ActionsType = setUserAT
export default authReducer;