import {authAPI, LoginDataRequestType, securityAPI} from "../../api/Api";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'
const SET_LOGIN_ERROR = 'auth/SET_LOGIN_ERROR'

type setLoginErrorAT = {
    type: typeof SET_LOGIN_ERROR
    loginError: null | string
}
type getCaptchaUrlAT = {
    type: typeof GET_CAPTCHA_URL
    captchaURL: null | string
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
    captchaURL: string | null

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
    loginError: null,
    captchaURL: null
}


const authReducer = (state: AuthReducerType = initialState, action: ActionsType): AuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                data: action.data,
                loginError: null
            }
        }
        case SET_LOGIN_ERROR: {
            return {
                ...state,
                loginError: action.loginError
            }
        }
        case GET_CAPTCHA_URL: {
            return {
                ...state,
                captchaURL: action.captchaURL
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
export const getCaptchaURLAC = (captchaURL: string | null): getCaptchaUrlAT => {
    return {
        type: GET_CAPTCHA_URL, captchaURL
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
        await dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            await dispatch(getCaptchaURL());
        }
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
export const getCaptchaURL = () => async (dispatch: Dispatch<ActionsType>) => {
    let response = await securityAPI.getCaptchaURL()
    dispatch(getCaptchaURLAC(response.data.url))
}

type ActionsType = setUserAT | setLoginErrorAT | getCaptchaUrlAT
export default authReducer;