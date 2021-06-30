import React from "react";
import {sendmessageActionCreator} from "../redux/message-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose, Dispatch} from "redux";


const mapStateToProps = (state: AppStateType) => {
    return {
        state: state.messagesPage
    }
}


const mapDispatchtoProps = (dispatch: Dispatch) => {
    return {
        sendmessage: (newMessageBody: string) => {
            dispatch(sendmessageActionCreator(newMessageBody));
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchtoProps),
    withAuthRedirect)(Dialogs)
