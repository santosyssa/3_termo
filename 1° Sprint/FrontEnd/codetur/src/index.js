import React from "react";
import ReactDOM from 'react-dom';
import { usuarioAutenticado } from "./services/auth";

// paginas
import Login from "./pages/Login/login";
import Adm from "./pages/Administrador/administrador";
import Home from "./pages/Home/home";
import {parseJwt} from './services/auth';


// rotas
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

const PrivateRoute = ({ component: Component }) => (
    <Route
        render={props =>
            parseJwt().TipoUsuario === 'Administrador' ?
            (
                <Component {...props}/>
            ) : (
                <Redirect 
                    to={{pathname: '/home', state: {from: props.location}}}
                />
            )
        }
    />
)

const Routes = (
    <BrowserRouter>
        <div>
        <Switch>
            <Route  exact path="/"  component={Login}/>
            <Route path='/home' component={Home}/>
            <PrivateRoute component={Adm} path="/administrador" />
            {/* <Route component={Sair} exact path="/sair" /> */}
        </Switch>
        </div>
    </BrowserRouter>
)

ReactDOM.render(Routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


    