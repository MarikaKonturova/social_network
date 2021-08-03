import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusType)=> {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

    const actiateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status);

    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <b>
            {!editMode
                ?
                <div>
                    <span onDoubleClick={() => actiateEditMode()}>{props.status || 'no status'}</span>
                </div>
                :
                <div>
                    <input onChange={onStatusChange} autoFocus={true} value={status}
                           onBlur={() => deactivateEditMode()}/>
                </div>}
        </b>
    )

}