import React from 'react';
import './App.css';
import {Login} from "./components/Login";
import {Profile} from "./components/Profile";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path={'/login'} render={() => <Login/>}/>
                    <Route exact path={'/Profile'} render={() => <Profile/>}/>
                    <Redirect from={'/'} to={'/login'}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
