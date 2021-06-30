import {Field, Form} from "react-final-form";
import {Input} from "../Common/FormsControls/FormControls";
import {requiredField} from "../../utils/validators/Validator";
import React from "react";
import {LoginDataRequestType} from "../../api/Api";

type LoginFormType ={
    onSubmit:(formData: LoginDataRequestType)=> void
}

export const LoginForm = ({onSubmit}: LoginFormType) => (
    <Form  onSubmit={onSubmit}
           render={({ handleSubmit }) => (
               <form onSubmit={handleSubmit}>
                   <div>
                       <Field name="email" component={Input}
                              validate={requiredField}
                              placeholder="email" />
                   </div>
                   <div>
                       <Field name="password"
                              validate={requiredField}
                              type={'password'}
                              component={Input} placeholder="password" />
                   </div>
                   <div>
                       <label>
                           <Field
                               name="rememberMe"
                               // validate={requiredField}
                               component={Input}
                               type="checkbox"
                           />
                           remember me
                       </label>
                   </div>
                   <button type="submit">Submit</button>
               </form>
           )}
    />
)
