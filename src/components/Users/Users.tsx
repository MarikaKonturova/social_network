import React from 'react';
import {UserType} from "../redux/user-reducer";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";

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
    return <div>
        <Paginator currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   pageSize={props.pageSize}
                   totalUsersCount={props.totalUsersCount}
                   portionSize={10}/>
        <div>
            {
                props.users.map(u => <User user={u} followingInProgress={props.followingInProgress}
                                           follow={props.follow} unfollow={props.unfollow}
                />)
            }
        </div>
    </div>


}