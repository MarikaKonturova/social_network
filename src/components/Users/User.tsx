import React from 'react';
import userPhoto from "../../asets/images/ava.png";
import {UserType} from "../redux/user-reducer";
import {NavLink} from 'react-router-dom';

type UserPropsType = {
    user: UserType
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: number[]
}

export const User = ({user, ...props}: UserPropsType) => {
    return <div key={user.id}>
                <span><div>
                <NavLink to={"/profile/" + user.id}>
                    <img src={user.photos.small ? user.photos.small : userPhoto} style={{maxWidth: '100px'}} className={"userPhoto"}/></NavLink>
                <div>
                    {user.followed ?
                        <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                            props.unfollow(user.id)
                        }}>Unfollow</button>
                        :
                        <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                            props.follow(user.id)

                        }}>Follow</button>}
                    </div>
            </div></span>
                <span>
                <div>{user.name}</div><div>{user.status}</div>
            </span>
            </div>
        }


