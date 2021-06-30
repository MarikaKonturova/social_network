import React from 'react';
import {addPostActionCreator} from "../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

const mapStateToProps = (state: AppStateType) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
             addPost : (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)