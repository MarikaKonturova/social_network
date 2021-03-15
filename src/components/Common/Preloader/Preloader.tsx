import React from "react";
import loading from "../../../asets/images/loading.gif";
type Preloader = {
    isFetching?: boolean
}
export const Preloader=(props: Preloader)=>{
   return <>
        <img src = {loading}/></>

        }