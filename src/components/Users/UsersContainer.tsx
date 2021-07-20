import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {
    UserType, followTC, unfollowTC, getUsers
} from "../redux/user-reducer";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {
    gePageSize,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getTotalUsersCount,
    getUsersSuperSelector,
} from "../redux/users-selectores";


type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
type MapDispatchPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

export type UsersPropsType = MapDispatchPropsType & MapStatePropsType

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)

    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage} users={this.props.users}
                   follow={this.props.follow} unfollow={this.props.unfollow}
                   onPageChanged={this.onPageChanged} followingInProgress={this.props.followingInProgress}/>
        </>
    }

}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        // users: getUsers(state),
        users: getUsersSuperSelector(state),
        pageSize: gePageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {
            follow: followTC,
            unfollow: unfollowTC, getUsers
        }))(UsersContainer)

