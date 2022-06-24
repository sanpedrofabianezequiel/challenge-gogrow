import React from 'react';
import {Route, Redirect} from 'react-router-dom';

interface IProps {
    path?: string;
    component: React.ComponentType<any>;
    authenticated: boolean;
    [key: string]: any;
}

export const PrivateScreen = ({authenticated,component:Component, ...rest}:IProps)=>{
    
    return (
        <Route  
            {...rest}
            component = { (props:any)=>
                (
                    (authenticated)
                    ? (<Component {...props} />)
                    : (<Redirect to ='/login'/>)
                )
            }
        />
    );
}