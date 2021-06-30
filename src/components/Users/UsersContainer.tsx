import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {
    acceptFollow, getUsers,
    setCurrentPage,
    acceptUnfollow,
    UserType, followTC, unfollowTC
} from "../redux/user-reducer";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloader/Preloader";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

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

        this.props.getUsers(this.props.currentPage, this.props.pageSize)
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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {
            follow: followTC,
            unfollow: unfollowTC, getUsers
        }),
    withAuthRedirect)(UsersContainer)

