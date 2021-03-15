import React from 'react';
import userPhoto from "../../asets/images/ava.png";
import {UserType} from "../redux/user-reducer";
import {Preloader} from "../Common/Preloader/Preloader";

type UsersFunc = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    unfollow: (userID: string) => void
    follow: (userID: string) => void
    onPageChanged:(p: number)=> void
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
                <img src={u.photos.small ? u.photos.small : userPhoto} className={"userPhoto"}/>
                <div>
                    {u.followed ?
                        <button onClick={() => {
                            props.unfollow(u.id)
                        }}>Unfollow</button>
                        :
                        <button onClick={() => {
                            props.follow(u.id)
                        }}>Follow</button>}
                    </div>
            </div></span>
                <span>
                <span><div>{u.fullName}</div><div>{u.status}</div></span>

                    {/*  <span><div>{u.location.city}</div><div>{u.location.country}</div></span>
           */}
            </span>
            </div>)
        }
    </div>


}
}