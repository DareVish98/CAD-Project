import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import App from './layout/App';
import {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import Listing from "./layout/Listing";

const layout = (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <div>
                <Route exact path={"/"} component={App}/>
                <Route path={"/listing=:id"} component={Listing}/>
            </div>
        </BrowserRouter>
    </ThemeProvider>
);

ReactDOM.render(layout, document.querySelector('#container'),
);