import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './layout/mainPage/App';
import {BrowserRouter, Route} from "react-router-dom";
import Listing from "./layout/listing/Listing";
import ProfilePage from "./layout/profile/profile";

const layout = (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <div>
                <Route exact path={"/"} component={App}/>
                <Route path={"/listing=:id"} component={Listing}/>
                <Route path={"/profile"} component={ProfilePage}/>
            </div>
        </BrowserRouter>
    </ThemeProvider>
);

ReactDOM.render(layout, document.querySelector('#container'),
);