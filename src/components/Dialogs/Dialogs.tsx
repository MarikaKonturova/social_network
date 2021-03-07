import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./DIalogItem/DialogItem";
import Message from "./Message/Message";
import {AppStateType} from "../redux/redux-store";

type messagesPage = {
    state: AppStateType["messagesPage"]
    sendmessage: () => void
    updatenewmessagebody: (body: string) => void
}
const Dialogs = (props: messagesPage) => {
    let dialogsElements = props.state.dialogs.map(el => (<DialogItem id={el.id} key={el.id} name={el.name}/>));
    let messagesElements = props.state.messages.map(message => <Message key ={message.id} message={message.message}/>);
    let newMessageBody = props.state.newMessageBody
    let newMessage = React.createRef<HTMLTextAreaElement>();
    let onSendMessageClick = () => {
            props.sendmessage();
    }
    let onNewMessageChange = (e: any) => {
        let body = e.target.value;
        props.updatenewmessagebody(body)
    }
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div> {messagesElements}</div>
            </div>
            <div>
                <textarea ref={newMessage}
                          value={newMessageBody}
                          onChange={onNewMessageChange}
                          placeholder='Enter your message'></textarea>
                <button onClick={onSendMessageClick}>Send</button>
            </div>

        </div>
    )
}
export default Dialogs;