import React from 'react';
import { PostType } from '../../redux/profile-reducer';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, Form} from "react-final-form";
import {composeValidators, maxLengthCreator, requiredField} from "../../../utils/validators/Validator";
import {Textarea} from "../../Common/FormsControls/FormControls";




const MyPosts = (props: MyPostsPropsType) => {

    let addPost = ({newPostText, ...restProps}: AddNewPostType) => {
            props.addPost(newPostText);
    }

    let postsElements = props.postsData.map(el => <Post message={el.message} likes={el.likes}/>);
    return (
        <div className={classes.postBlock}>
            <h3>My posts</h3>
            <div>
                <NewPostForm addPost={addPost} required={requiredField}/>
                <div className={classes.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
}


const maxLength10 =  maxLengthCreator(10)
const NewPostForm = ({addPost,required, ...restProps}: NewPostFormType) => {
    return (
        <Form onSubmit={addPost}
              render={({handleSubmit}) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Field name="newPostText"
                                 component={Textarea}
                                 placeholder="Enter your post"
                                 validate={composeValidators(required,maxLength10)}
                          />
                      </div>
                      <button type="submit">Submit</button>
                  </form>
              )}
        />
    )
}
type NewPostFormType={
    addPost:(values: AddNewPostType)=> void
    required:(value: any)=> void
}
type AddNewPostType = {
    newPostText: string
}

type MyPostsPropsType = {
    postsData: Array<PostType>,
    addPost:(newPost: string)=> void
}

export default MyPosts;