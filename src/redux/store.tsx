import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {authReducer} from "./auth-reducer";


const rootReducer = combineReducers({
    auth: authReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .prepend(thunk)
})
