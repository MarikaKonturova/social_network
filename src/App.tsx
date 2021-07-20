import React, {Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
//import ProfileContainer from './components/Content/ProfileContainer';
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./components/redux/app-reducer";
import store, {AppStateType} from "./components/redux/redux-store";
import {Preloader} from "./components/Common/Preloader/Preloader";
import {withSuspense} from "./components/hoc/withSuspense";

const DialogsContainer = React.lazy(() => import( "./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import( './components/Content/ProfileContainer'))

class App extends React.Component<AppContainerProps> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs"
                           render={withSuspense(DialogsContainer)}/>
                    <Route path="/profile/:userId?"
                           render={withSuspense(ProfileContainer)}/>
                    <Route path="/users"
                           render={() => <UsersContainer/>}/>
                    <Route path="/login"
                           render={() => <Login/>}/>

                </div>
            </div>
        );
    }
}

let MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})


type MapDispatchToProps = {
    initializeApp: () => void
}
type MapStateToPropsType = {
    initialized: boolean
}
type AppContainerProps = MapDispatchToProps & MapStateToPropsType


let AppContainer = compose<React.ComponentType>(withRouter, connect(MapStateToProps, {initializeApp}))(App);
export const SamuraiJSApp = (props: any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
