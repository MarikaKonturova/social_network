import {Field, Form} from "react-final-form";
import {Input} from "../Common/FormsControls/FormControls";
import {requiredField} from "../../utils/validators/Validator";
import React from "react";
import {LoginDataRequestType} from "../../api/Api";
import {FORM_ERROR} from "final-form";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import s from '../Common/FormsControls/FormControls.module.css'


type LoginFormType = {
    login: (formData: LoginDataRequestType) => void
}

export const LoginForm = ({login}: LoginFormType) => {
    const error = useSelector<AppStateType, null | string>(state => state.auth.loginError)
    const onSubmit = (formData: LoginDataRequestType) => {
        login(formData)
    }
    return (
        <Form onSubmit={onSubmit}
              render={({handleSubmit}) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Field name="email" component={Input}
                                 validate={requiredField}
                                 placeholder="email"/>
                      </div>
                      <div>
                          <Field name="password"
                                 validate={requiredField}
                                 type={'password'}
                                 component={Input} placeholder="password"/>
                      </div>
                      <div>
                          <label>
                              <Field
                                  name="rememberMe"
                                  component={Input}
                                  type="checkbox"
                              />
                              remember me
                          </label>
                      </div>
                      {error && <div className={s.error}>{error}</div>}
                      <button type="submit">Submit</button>
                  </form>
              )}
        />
    )
}
