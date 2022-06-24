import React from 'react';
import {Route, Redirect} from 'react-router-dom';

interface IProps {
    path?: string;
    component: React.ComponentType<any>;
    authenticated: boolean;
    [key: string]: any;
}

export const PublicScreen = ({authenticated,component:Component, ...rest}:IProps)=>{
    //Rest => All propertys on the params
    return(
        <Route 
            {...rest}
            component= {
                (props:any)=>(
                    (authenticated === false)
                    ? (<Component {...props} />) //We will send all propertys inside the Component= (*Name Component)
                    : (<Redirect to="/"/>)
                )
            }
        />
    )
}