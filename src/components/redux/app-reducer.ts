import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED'

export type setInitializedAT = {
    type: typeof SET_INITIALIZED
}


export type AppReducerType = {
    initialized: boolean
}
let initialState: AppReducerType = {
    initialized: false
}


export const appReducer = (state: AppReducerType = initialState, action: ActionsType): AppReducerType => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}
export const setInitialized = (): setInitializedAT => {
    return {
        type: SET_INITIALIZED,
    }
}

export const initializeApp = () => (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    dispatch(getAuthUserData()).then(()=>{
        dispatch(setInitialized())
    })
}



type ActionsType = setInitializedAT