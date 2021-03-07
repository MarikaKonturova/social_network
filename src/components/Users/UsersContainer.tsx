import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC} from "../redux/user-reducer";
const mapStateToProps = (state: AppStateType)=> {
    return {
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch: Dispatch)=> {
    return {
        follow: (userID: string) =>{
            dispatch(followAC(userID))
        },
        unfollow: (userID: string) =>{
            dispatch(unfollowAC(userID))
        },
        setUsers: (users:[])=>{
            dispatch(setUsersAC(users))
        }
    }
}
export default connect (mapStateToProps, mapDispatchToProps)(Users)
