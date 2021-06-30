type sendmessageActionType = {
    type: typeof sendmessage,
    newMessageBody: string
}
type MessageActionTypes = sendmessageActionType
export const sendmessageActionCreator = (newMessageBody: string): sendmessageActionType => {
    return {
        type: sendmessage,
        newMessageBody
    }
}


const sendmessage = "SEND-MESSAGE";
type InitialStateType = typeof initialState;
let initialState = {
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
        {id: 5, message: 'Yo'}]
}

export const messageReduser = (state: InitialStateType = initialState, action: MessageActionTypes): InitialStateType => {
    switch (action.type) {
        case sendmessage: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}],
                dialogs: [...state.dialogs, {id: 6, name: 'who-to'}],
            }
        }
        default:
            return state;
    }
}
export default messageReduser;