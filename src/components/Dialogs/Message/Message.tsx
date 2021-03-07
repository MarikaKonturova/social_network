import React from "react";

import classes from './../Dialogs.module.css';

const Message = (props: any) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )

}

export default Message;