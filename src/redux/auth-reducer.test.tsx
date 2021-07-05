import {
    authMeThunk,
    authReducer,
    changeIsLoader,
    loginThunk,
    logOutClearState,
    LogOutType,
    setError
} from "./auth-reducer";
import {LoginParamsType} from "../api/login-api";

type initialStateType = {
    name:string
    email:string
    accessToken:string
    tokenType:string
    isLoggedIn:boolean
    isLoader:boolean
    error:string
}
let initialState:initialStateType;

beforeEach(() => {
    initialState = {
        isLoggedIn: false,
        isLoader: false,
        tokenType: 'tokenType',
        accessToken: 'accessToken',
        name: 'name',
        email: 'email',
        error: ''
    }
})
test('text error should be added', () => {
    const newState = authReducer(initialState, setError({error:'error'}))
    expect(newState.error).toBe('error')
})
test('loader should be changed', () => {
    const newState = authReducer(initialState, changeIsLoader({isLoader:true}))
    expect(newState.isLoader).toBeTruthy()
})
test('data in state should be removed', () => {
    const clearStateObj:LogOutType = {
        accessToken:'',
        email:'',
        isLoggedIn:false,
        name:'',
        tokenType:''
    }
    const newState = authReducer(initialState, logOutClearState(clearStateObj))
    expect(newState.accessToken).toBeFalsy()
    expect(newState.isLoggedIn).toBeFalsy()
})
test('login data should be added', () => {
    const loginParams:LoginParamsType = {clientId:1, email:'email@123.com', password:'123'}
    const params = {tokenType:'bearer', accessToken: 'user123', isLoggedIn:true}
    const action = loginThunk.fulfilled(params, '', loginParams)
    const newState = authReducer(initialState, action)
    expect(newState.accessToken).toBe('user123')
    expect(newState.isLoggedIn).toBeTruthy()
})
test('auth data should be added', () => {
    const params = {name:'user', email: 'email@123.com', isLoggedIn:true}
    const token = '123'
    const action = authMeThunk.fulfilled(params, '', token)
    const newState = authReducer(initialState, action)
    expect(newState.name).toBe('user')
    expect(newState.email).toBe('email@123.com')
    expect(newState.isLoggedIn).toBeTruthy()
})
