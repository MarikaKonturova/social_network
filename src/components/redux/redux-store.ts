import {combineReducers, createStore} from "redux";
import profileReduser from "./profile-reducer";
import messageReduser from "./message-reducer";
import userReduser from "./user-reducer";
let rootReducer = combineReducers(
    {

        profilePage: profileReduser,
        messagesPage: messageReduser,
        usersPage: userReduser

    }
);
export type AppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer);

// @ts-ignore
window.store =store;

export default store;