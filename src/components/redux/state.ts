import profileReduser from "./profile-reducer";
import dialogsReduser from "./dialogs-reducer";

/*export type PrototypeMessage = {
    id: number
    message: string
}
export type PrototypeDialogs = {
    id: number
    name: string
}
export type PrototypeMessagePage = {
    dialogs: Array<PrototypeDialogs>
    messages: Array<PrototypeMessage>
    newMessageBody: string
}
export type PrototypePostsData = {
    likes: number
    message: string
    id: string
}
export type PrototypeProfilePage = {
    postsData: Array<PrototypePostsData>
    newPostText: string
}*/
/*
export type state = {
    profilePage: PrototypeProfilePage
    messagesPage: PrototypeMessagePage

}
export type RootStateType = {
    _state: state
    getState: () => state,
    _callsubscriber: (state: state) => void,
    subscribe: (observer: ()=>void)=> void
    dispatch: (action: object) => void
}
let store: RootStateType = {
    _state: {
        profilePage: {
            postsData: [
                {likes: 12, message: 'Hi, how are you?', id: "1"},
                {likes: 21, message: 'It\'s my first post', id: "2"},
                {likes: 3, message: 'Yo', id: "3"},
                {likes: 4, message: 'Yo', id: "4"},
                {likes: 5, message: 'Yo', id: "5"}
            ],
            newPostText: 'it-kamasutra'
        },
        messagesPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Valera'}],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your it-kamasutra'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}],
            newMessageBody: ""
        }

    },
    getState() {
        return this._state;
    },
    _callsubscriber(s: state) {
    },

    subscribe(observer: ()=>void ) {
        this._callsubscriber = observer;
    },

    dispatch(action: any) {
        this._state.profilePage = profileReduser(store._state.profilePage, action)
        this._state.messagesPage = messageReduser(store._state.messagesPage, action)
        this._callsubscriber(this._state);
    }

}

export default store;*/
