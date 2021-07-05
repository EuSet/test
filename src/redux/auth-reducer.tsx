import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authMe, login, LoginParamsType} from "../api/login-api";


const initialState = {
    isLoggedIn: false,
    isLoader: false,
    tokenType: '',
    accessToken: '',
    name: '',
    email: '',
    error: ''
}
export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (data: LoginParamsType, {dispatch, rejectWithValue}) => {
        try {
            dispatch(changeIsLoader({isLoader: true}))
            const responseData = await login(data)
            return {
                tokenType: responseData.data.tokenType,
                accessToken: responseData.data.accessToken, isLoggedIn: true
            }
        } catch (e) {
            dispatch(setError({error: 'Something wrong'}))
            setTimeout(() => {
                dispatch(setError({error: ''}))
            },3000)
            return rejectWithValue(e.toString())
        }
        finally {
            dispatch(changeIsLoader({isLoader: false}))
        }
    }
)
export const authMeThunk = createAsyncThunk(
    'auth/authMeThunk',
    async (token: string, {dispatch, rejectWithValue}) => {
        try {
            dispatch(changeIsLoader({isLoader: true}))
            const responseData = await authMe(token)
            return {name: responseData.data.name, email: responseData.data.email, isLoggedIn: true}
        } catch (e) {
            dispatch(setError({error: 'Something wrong'}))
            setTimeout(() => {
                dispatch(setError({error: ''}))
            },3000)
            return rejectWithValue(e.toString())
        }
        finally {
            dispatch(changeIsLoader({isLoader: false}))
        }
    }
)
export type LogOutType = {
    name:string
    email:string
    accessToken:string
    tokenType:string
    isLoggedIn:boolean
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error
        },
        changeIsLoader(state, action: PayloadAction<{ isLoader: boolean }>) {
            state.isLoader = action.payload.isLoader
        },
        logOutClearState(state, action: PayloadAction<LogOutType>) {
            return {...state, ...action.payload}
        }

    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            return {...state, ...action.payload}
        })
        builder.addCase(authMeThunk.fulfilled, (state, action) => {
            return {...state, ...action.payload}
        })
    }
})
export const authReducer = authSlice.reducer
export const {setError, changeIsLoader, logOutClearState} = authSlice.actions
