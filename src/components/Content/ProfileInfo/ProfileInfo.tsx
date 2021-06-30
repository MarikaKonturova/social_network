import React from 'react';
import classes from './ProfileIInfo.module.css';
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";
import {ProfileType, updateUserStatus} from "../../redux/profile-reducer";

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img
                    src='https://www.tripsavvy.com/thmb/FwmQ-JvBEBDDlVb-j_zdEo0iVsA=/2048x1152/smart/filters:no_upscale()/beach-5b59c9b7c9e77c004b3e0ff0.jpg'/>
            </div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <div>
                    {props.profile.lookingForAJob ? props.profile.lookingForAJobDescription : 'I\'m looking for a job'}
                </div>
                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>

            </div>
        </div>

    )
}
export default ProfileInfo;