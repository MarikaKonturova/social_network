import React from 'react';
import classes from './ProfileIInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src='https://www.tripsavvy.com/thmb/FwmQ-JvBEBDDlVb-j_zdEo0iVsA=/2048x1152/smart/filters:no_upscale()/beach-5b59c9b7c9e77c004b3e0ff0.jpg'/>
            </div>
            <div className={classes.descriptionBlock}>
                ava + description
            </div>
        </div>

    )
}
export default ProfileInfo;