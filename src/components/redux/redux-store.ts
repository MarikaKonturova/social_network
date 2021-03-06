import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReduser from "./profile-reducer";
import dialogsReduser from "./dialogs-reducer";
import userReducer from "./user-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware  from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {appReducer} from "./app-reducer";

let rootReducer = combineReducers(
    {

        profilePage: profileReduser,
        messagesPage: dialogsReduser,
        usersPage: userReducer,
        auth: authReducer,
        app: appReducer
    }
);
export type AppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));


export default store;