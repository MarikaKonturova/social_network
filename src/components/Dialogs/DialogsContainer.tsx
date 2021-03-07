import React from "react";
import {sendmessageActionCreator, updatenewmessagebodyActionCreator} from "../redux/message-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

/*const DialogsContainer = (props: messagesPage) => {
    let onSendMessageClick = () => {
        props.store.dispatch(sendmessageActionCreator());
    }
    let onNewMessageChange = (body: string) => {
        props.store.dispatch(updatenewmessagebodyActionCreator(body))
    }
    return (
        <Dialogs state={props.store.getState().messagesPage}
                 updatenewmessagebody={onNewMessageChange}
                 sendmessage={onSendMessageClick}/>
    )
}*/

const mapStateToProps = (state: AppStateType) => {
    return {
        state: state.messagesPage
    }
}
const mapDispatchtoProps = (dispatch: ((action:any)=>void)) => {
    return {
        updatenewmessagebody: (body:string) => {
            dispatch(updatenewmessagebodyActionCreator(body))
        },
        sendmessage: () => {
            dispatch(sendmessageActionCreator());
        }
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchtoProps)(Dialogs);
export default DialogsContainer;