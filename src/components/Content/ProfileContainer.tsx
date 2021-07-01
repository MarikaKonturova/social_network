import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, ProfileType, updateUserStatus} from "../redux/profile-reducer";
import {AppStateType} from "../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";


type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType
type MapStatePropsType = {
    profile: ProfileType
    status: string,
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = (this.props.match.params.userId);
        if (!userId) {
           // const userId='1455'
           if(this.props.authorizedUserId) {
               userId = (this.props.authorizedUserId).toString()
           } else{
               return <Redirect to={'/login'}/>
           }
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.data.id,
    isAuth: state.auth.isAuth

});
export default compose<React.ComponentType>(connect(mapStateToProps, {getUserProfile,getUserStatus,updateUserStatus}),
    withRouter,
    withAuthRedirect)
(ProfileContainer)
