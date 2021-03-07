import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../redux/profile-reducer";
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
        updateNewPostText : (text: string) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },
        addPost : () => {
            dispatch(addPostActionCreator());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)
// export default MyPostsContainer;