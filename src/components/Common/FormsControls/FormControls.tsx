import React from "react";
import s from './FormControls.module.css'


export const FormControl = (props:any)=>{
    const hasError =props.meta.error && props.meta.touched
    return <div className={`${s.formControl} ${hasError && s.error}`}>
        <div>
            {props.children}
        </div>
        { hasError&& <span>{props.meta.error}</span> }
    </div>
}


export const Textarea = (props: any)=>{
    return <FormControl {...props}><textarea {...props.input} {...props}/></FormControl>
}
export const Input = (props: any)=>{
    return <FormControl {...props}><input {...props.input} {...props}/></FormControl>
}