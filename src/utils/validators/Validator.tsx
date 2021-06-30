import React from "react";

export const requiredField = (value: any) => {
    return value? undefined : 'Field is required'
}
export const maxLengthCreator = (maxLength: number) => (value: any)=>{
    return  value.length<maxLength ? undefined : `Max length is ${maxLength} symbols`
}
export const composeValidators = (...validators:any) => (value: any) =>
    validators.reduce((error:string, validator:any) => error || validator(value), undefined)

