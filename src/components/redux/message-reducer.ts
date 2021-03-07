import React from "react";

type updatenewmessagebodyActionType = {
    type: typeof updatenewmessagebody
    body: string
}
type sendmessageActionType = {
    type: typeof sendmessage
}
type MessageActionTypes = sendmessageActionType | updatenewmessagebodyActionType
export const updatenewmessagebodyActionCreator = (body: string): updatenewmessagebodyActionType => {
    return {
        type: updatenewmessagebody,
        body: body
    }
}
export const sendmessageActionCreator = (): sendmessageActionType => {
    return {
        type: sendmessage
    }
}


const updatenewmessagebody = 'UPDATE-NEW-MESSAGE-BODY';
const sendmessage = "SEND-MESSAGE";
type InitialState = typeof initialState;
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
        {id: 5, message: 'Yo'}],
    newMessageBody: ""
}

export const messageReduser = (state: InitialState = initialState, action: MessageActionTypes): InitialState => {
    switch (action.type) {
        case updatenewmessagebody: {
            return {
                ...state,
                newMessageBody: action.body
            }

        }
        case sendmessage: {
            let body = state.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}],
                dialogs: [...state.dialogs, {id: 6, name: 'who-to'}],
                newMessageBody: ""
            }

        }
        default:
            return state;

    }
}
export default messageReduser;