import React from "react";
import {Field, FieldInputProps, Form} from "react-final-form";
import {Input} from "../../Common/FormsControls/FormControls";
import {ContactType} from "./ProfileInfo";
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../redux/profile-reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

export const ProfileDataForm = (props: ProfileDataFormType) => {
    const error = useSelector<AppStateType, null | string>(state => state.profilePage.errorDataForm)

    return (
        <Form onSubmit={props.onSubmit}
              render={({handleSubmit}) => (
                  <form onSubmit={handleSubmit}>
                      <button type="submit">save</button>
                      {error && <div className={s.error}>{error}</div>}

                      <Field name="fullName" defaultValue={props.profile.fullName}>
                          {({input}) => (
                              <div>
                                  <label><b>Full name </b></label>
                                  <input {...input} type="text" placeholder={props.profile.fullName}/></div>
                          )}
                      </Field>

                      <div>
                          <b>Looking for a job</b>: <Field name="lookingForAJob" component={Input} type={'checkbox'}
                                                           defaultValue={props.profile.lookingForAJob}
                                                           placeholder={props.profile.lookingForAJob ? 'yes' : 'no'}/>
                      </div>
                      <div>
                          <b>My professional skills</b>: <Field name="lookingForAJobDescription" component={Input}
                                                                defaultValue={props.profile.lookingForAJobDescription}
                                                                placeholder={props.profile.lookingForAJobDescription}/>
                      </div>
                      <div>
                          <b>About me</b>: <Field name="aboutMe" component={Input}
                                                  defaultValue={props.profile.aboutMe}
                                                  placeholder={props.profile.aboutMe}/>
                      </div>
                      <div>
                          <b>Contacts</b> :

                          {Object.keys(props.profile.contacts).map((key) => {
                              return (
                                  <div className={s.contact} key={key}>
                                      <b>{key}</b> : <Field name={`contacts.${key}`} component={Input}
                                                            defaultValue={props.profile.contacts[key as keyof ContactType]}
                                                            placeholder={props.profile.contacts[key as keyof ContactType]}/>

                                  </div>
                              )
                          })}
                      </div>
                  </form>
              )}
        />
    )
}

//types

type ProfileDataFormType = {
    profile: ProfileType
    onSubmit: (formData: any) => void
}


