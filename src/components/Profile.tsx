import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../redux/store";
import {authMeThunk, logOutClearState, LogOutType} from "../redux/auth-reducer";
import r from "./Login.module.css";
import {Preloader} from "./utills/Preloader";

export const Profile = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const token = useSelector<AppRootStateType, string>(state => state.auth.accessToken)
    const name = useSelector<AppRootStateType, string>(state => state.auth.name)
    const email = useSelector<AppRootStateType, string>(state => state.auth.email)
    const isLoader = useSelector<AppRootStateType, boolean>(state => state.auth.isLoader)
    const logOut = () => {
        const clearStateObj:LogOutType = {
            accessToken:'',
            email:'',
            isLoggedIn:false,
            name:'',
            tokenType:''
        }
        dispatch(logOutClearState(clearStateObj))
    }
    useEffect(() => {
        if(token){
            dispatch(authMeThunk(token))
        }
    }, [dispatch, token])
    if(!isLoggedIn){
        return <Redirect to={'/login'}/>
    }
    return <div className={r.container}>
        <div className={r.main}>
            <h3>OZITAG Company</h3>
            {isLoader ? <Preloader/> :
                <div>
                    <div className={r.formWrap}>
                        <div>
                            <h4>Name:</h4>
                            <span>{name}</span>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <span>email: {email}</span>
                        </div>
                        <div className={r.btnWrap}>
                            <button onClick={logOut} type="button"><span>LOG OUT</span></button>
                        </div>
                    </div>
                </div>}
        </div>
    </div>
}
