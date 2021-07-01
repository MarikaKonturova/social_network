import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from './components/Content/ProfileContainer';
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./components/redux/app-reducer";
import {AppStateType} from "./components/redux/redux-store";
import {Preloader} from "./components/Common/Preloader/Preloader";


class App extends React.Component<AppContainerProps> {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Route path="/dialogs"
                               render={() => <DialogsContainer/>}/>
                        <Route path="/profile/:userId?"
                               render={() => <ProfileContainer/>}/>
                        <Route path="/users"
                               render={() => <UsersContainer/>}/>
                        <Route path="/login"
                               render={() => <Login/>}/>

                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
let MapStateToProps = (state: AppStateType): MapStateToPropsType=>({
    initialized: state.app.initialized
})


type MapDispatchToProps = {
    initializeApp:()=>void
}
type MapStateToPropsType ={
    initialized: boolean
}
type AppContainerProps = MapDispatchToProps & MapStateToPropsType


export default compose<React.ComponentType>(withRouter, connect(MapStateToProps, {initializeApp}))(App);
