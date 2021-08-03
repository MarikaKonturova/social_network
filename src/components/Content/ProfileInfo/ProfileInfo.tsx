import React, {ChangeEvent, useState} from 'react';
import {Preloader} from "../../Common/Preloader/Preloader";
import userDefaultAvatar from "../../../asets/images/userWithoutAvatar.jpg";
import {ProfileType} from "../../redux/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import s from "./ProfileInfo.module.css"
import {ProfileDataForm} from "./ProfileDataForm";


const ProfileInfo = (props: ProfileInfoType) => {
    let [editMode, setEditMode] = useState(false)
    const onChangeUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        else {
            props.savePhoto(e.target.files[0])
        }
    }
    if (!props.profile) {
        return <Preloader/>
    }
    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData).then(() => {
                setEditMode(false)
            }
        )

    }

    return (
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large || userDefaultAvatar} className={s.userPhoto}/>
            {props.isOwner && <input type={'file'} onChange={onChangeUserAvatar}/>}
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
            {editMode
                ? <ProfileDataForm profile={props.profile} onSubmit={onSubmit}/>
                : <ProfileData profile={props.profile} isOwner={props.isOwner} setEditMode={setEditMode}/>

            }
        </div>

    )
}
const ProfileData = ({profile, setEditMode, isOwner}: ProfileDataType) => {

    return <>
        <button onClick={() => {
            if (setEditMode) setEditMode(true)
        }}>Edit Profile
        </button>
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob
        && <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        }

        <div>
            <b>Contacts</b> : {Object.keys(profile.contacts).map((key) => {
            return (
                <Contact
                    contactTitle={key}
                    contactValue={profile.contacts[key as keyof ContactType]}
                />
            )
        })}
            {/*THE SECOND SOLUTION*/}
            {/*{
                    Object.entries(props.profile.contacts).map((arr) => {
                        return (
                            <Contact
                                contactTitle={arr[0]}
                                contactValue={arr[1]}
                            />
                        )
                    })}*/}
        </div>
    </>
}

export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div className={s.contact}><b>{contactTitle}</b> : {contactValue}</div>
}

//types

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (image: string | Blob) => void
    saveProfile: (formData: ProfileType) => Promise<void>
}
export type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ContactPropsType = {
    contactTitle: string,
    contactValue: string
}
type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    setEditMode: (EditMode: boolean) => void
}

export default ProfileInfo;