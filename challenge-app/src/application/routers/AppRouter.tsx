import  { useEffect } from 'react'
import {BrowserRouter as Router ,Redirect, Switch} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from "../screens";
import { PublicScreen } from './PublicScreen/PublicScreen';



export const AppRouter = () => {
    const dispatch = useDispatch();
    const {uid} = useSelector((state:any)=>state.auth);
    useEffect(()=>{
        //dispatch(startRegister());
    },[dispatch]);
    return(
        <Router>
           <>
               <Switch>
                   <PublicScreen exact path="/" component={LoginScreen} authenticated={!!uid}/>
                   {/*<PublicScreen exact path="/register" component={RegisterScreen} authenticated={!!uid}/>
                   <PrivateScreen exact path="/home" component={HomeScreen} authenticated={!!uid}/>
                   <PrivateScreen exact path="/about-us" component={AboutUsScreen} authenticated={!!uid}/>*/}
                   <Redirect  to="/" />
               </Switch>
           </>
        </Router>
    )
}

