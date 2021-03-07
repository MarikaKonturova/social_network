import React from 'react';
import { PostType } from '../../redux/profile-reducer';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";


type MyPostsPropsType = {
    postsData: Array<PostType>,
    newPostText: string
    addPost:()=> void
    updateNewPostText:(text:string)=> void
}


const MyPosts = (props: MyPostsPropsType) => {

    let newPostElement = React.createRef<HTMLTextAreaElement>();
    let addPost = () => {
        if (newPostElement.current) {
            props.addPost();
        }
    }

    let postsElements = props.postsData.map(el => <Post message={el.message} likes={el.likes}/>);
    let onPostChange = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value;
            props.updateNewPostText(text);
        }
    };
    return (
        <div className={classes.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
                <div className={classes.posts}>
                    {postsElements}
                </div>

            </div>
        </div>
    )
}
export default MyPosts;