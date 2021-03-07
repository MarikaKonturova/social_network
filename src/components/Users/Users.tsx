import React from 'react';
import c from './Users.module.css'
import {UserType} from "../redux/user-reducer";

type UsersPropsType = {
    setUsers: (users: []) => void
    unfollow: (userID: string) => void
    follow: (userID: string) => void
    users: UserType[]
}
const Users = (props: UsersPropsType) => {
    return (
        <div>{
            props.users.map(u => <div key={u.id}>
                <span><div>
                <img src={u.avatarPhoto} className={c.userPhoto}/>
                <div>
                    {u.followed ?
                        <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                        :
                        <button onClick={() => {props.follow(u.id)}}>Follow</button>}
                    </div>
            </div></span>
                <span>
                <span><div>{u.fullName}</div><div>{u.status}</div></span>

                <span><div>{u.location.city}</div><div>{u.location.country}</div></span>
            </span>
            </div>)
        }
        </div>
    )
}
export default Users;