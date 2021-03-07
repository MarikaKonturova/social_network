import React from 'react';
import classes from './Post.module.css';

const Post = (props: any) => {
    return (

        <div className={classes.item}>
            <img
                src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"/>
            {props.message}
            <div>
                <span>like </span> {props.likes}
            </div>
             </div>
    )
}
export default Post;