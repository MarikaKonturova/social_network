import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./DIalogItem/DialogItem";
import Message from "./Message/Message";
import {AppStateType} from "../redux/redux-store";
import {Field, Form} from "react-final-form";
import {Textarea} from "../Common/FormsControls/FormControls";
import {composeValidators, maxLengthCreator, requiredField} from "../../utils/validators/Validator";


const Dialogs = (props: messagesPage) => {
    let dialogsElements = props.state.dialogs.map(el => (<DialogItem id={el.id} key={el.id} name={el.name}/>));
    let messagesElements = props.state.messages.map(message => <Message key={message.id} message={message.message}/>);


    const addNewMessage = ({newMessageBody}: AddNewMessageType) => {
        props.sendmessage(newMessageBody);
    }


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div> {messagesElements}</div>
            </div>
            <NewMessageForm addNewMessage={addNewMessage} required={requiredField}/>
        </div>
    )
}
const maxLength100 =  maxLengthCreator(100)
const NewMessageForm = ({addNewMessage, required, ...restProps}: NewMessageFormType) => {
    return (
        <Form onSubmit={addNewMessage}
              render={({handleSubmit}) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Field name="newMessageBody"
                                 validate={composeValidators(required,maxLength100)}
                                 component={Textarea}
                                 placeholder="Enter your message"/>
                      </div>
                      <button type="submit">Submit</button>
                  </form>
              )}
        />
    )
}

//types

type messagesPage = {
    state: AppStateType["messagesPage"]
    sendmessage: (newMessageBody: string) => void
    isAuth: boolean
}
type AddNewMessageType = {
    newMessageBody: string

}
type NewMessageFormType = {
    addNewMessage: (values: AddNewMessageType) => void
    required:(value: any)=> void

}
export default Dialogs;