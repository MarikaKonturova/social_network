import {authAPI, LoginDataRequestType} from "../../api/Api";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'auth/SET-USER-DATA'
const SET_LOGIN_ERROR = 'auth/SET_LOGIN_ERROR'

type setLoginErrorAT = {
    type: typeof SET_LOGIN_ERROR
    loginError: null | string
}
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


export type AuthReducerType = {
    isFetching: boolean
    data: {
        id: null | number
        email: null | string
        login: null | string
        isAuth: boolean
    }
    appInitialized: boolean
    loginError: null | string
}
let initialState: AuthReducerType = {
    isFetching: false,
    data: {
        id: null,
        email: null,
        login: null,
        isAuth: false
    },
    appInitialized: false,
    loginError: null
}


const authReducer = (state: AuthReducerType = initialState, action: ActionsType): AuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA: {

            let a = {
                ...state,
                data: action.data,
                loginError: null
            }
            return a
        }
        case SET_LOGIN_ERROR: {
            return {
                ...state,
                loginError: action.loginError
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
export const setLoginError = (loginError: string): setLoginErrorAT => {
    return {
        type: SET_LOGIN_ERROR, loginError
    }
}
export const getAuthUserData = () => async (dispatch: Dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setUserData(id, login, email, true));
    }

}

export const login = (data: LoginDataRequestType) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    let response = await authAPI.login(data)
    console.log('login ===>')
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        const message = response.data.messages.length > 0 ? response.data.messages[0] : 'email or password is wrong'
        dispatch(setLoginError(message))
    }
}
export const logout = () => async (dispatch: Dispatch<ActionsType>) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    }
}

type ActionsType = setUserAT | setLoginErrorAT
export default authReducer;