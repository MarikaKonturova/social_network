import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {logout} from "../redux/auth-reducer";

type MapDispatchToProps = {
  //  getAuthUserData:()=>void,
    logout:()=>void
}

type MapStateToProps = {
    isAuth: boolean
    data: { id: number | null, email: string | null, login: string | null }
    isFetching: boolean

}
type HeaderContainerProps = MapStateToProps & MapDispatchToProps

class HeaderContainer extends React.Component<HeaderContainerProps, MapStateToProps> {


    render() {
        return (
            <Header isFetching={this.props.isFetching} data={this.props.data} isAuth={this.props.isAuth} logout={this.props.logout}/>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    data: state.auth.data,
    isFetching: state.auth.isFetching
})

export default connect(mapStateToProps, {
    logout
})(HeaderContainer);