import React from 'react';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import IndexContainer from './containers/IndexContainer';
import AboutContainer from './containers/AboutContainer';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={IndexContainer} />
                <Route path='/about' component={AboutContainer} />
            </Switch>
        </BrowserRouter>
    )
}