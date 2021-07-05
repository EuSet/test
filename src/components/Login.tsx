import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../redux/auth-reducer";
import React from "react";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../redux/store";
import r from "./Login.module.css"
import {Preloader} from "./utills/Preloader";

type FormErrorType = {
    email?: string
    password?: string
}
export const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const error = useSelector<AppRootStateType, string>(state => state.auth.error)
    const isLoader = useSelector<AppRootStateType, boolean>(state => state.auth.isLoader)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            clientId: 1,
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormErrorType = {};
            if (!values.email || !values.password) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginThunk(values))
            formik.resetForm()
        }
    })
    if (isLoggedIn) {
        return <Redirect to={'/Profile'}/>
    }
    const errorSpan = (error: string) => {
        return <span className={r.error}>{error}</span>
    }
    return <div className={r.container}>
        <div className={r.main}>
            <h3>OZITAG Company</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className={r.formWrap}>
                    <div>
                        {formik.errors.email && formik.touched.email ? errorSpan(formik.errors.email)
                            : error && errorSpan(error)}
                        <input
                            {...formik.getFieldProps('email')}
                            placeholder={'email'}/>
                    </div>
                    <div>
                        {formik.errors.password ? errorSpan(formik.errors.password) : error && errorSpan(error)}
                        <input
                            {...formik.getFieldProps('password')}
                            placeholder={'password'} type={'password'}/>
                    </div>
                    <div className={r.btnWrap}>
                        {isLoader ? <div><Preloader/></div> :
                            <button type="submit"><span>LOG IN</span></button>
                        }
                    </div>
                </div>
            </form>
        </div>
    </div>
}
