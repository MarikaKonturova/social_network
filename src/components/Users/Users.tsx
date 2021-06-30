import React from 'react';
import userPhoto from "../../asets/images/ava.png";
import {UserType} from "../redux/user-reducer";
import {NavLink} from 'react-router-dom';
import {usersAPI} from "../../api/Api";

type UsersFunc = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    onPageChanged: (p: number) => void
    followingInProgress: number[]
}

export const Users = (props: UsersFunc) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = []
    for (let i = 0; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => <span
                onClick={(e) => {
                    props.onPageChanged(p)
                }}
                className={props.currentPage === p ? 'selectedPage' : ''}>{p}</span>)}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span><div>
                <NavLink to={"/profile/" + u.id}>
                    <img src={u.photos.small ? u.photos.small : userPhoto} style={{maxWidth: '100px'}} className={"userPhoto"}/></NavLink>
                <div>
                    {u.followed ?
                        <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                            props.unfollow(u.id)
                        }}>Unfollow</button>
                        :
                        <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                            props.follow(u.id)

                        }}>Follow</button>}
                    </div>
            </div></span>
                <span>
                <div>{u.name}</div><div>{u.status}</div>
            </span>
            </div>)
        }
    </div>


}