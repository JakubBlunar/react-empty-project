import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import IndexContainer from './containers/IndexContainer';
import AboutContainer from './containers/AboutContainer';

export default () => (
	<div>
		<Helmet
			defaultTitle="My app - MyApp"
			titleTemplate="%s - MyApp"
		/>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={IndexContainer} />
				<Route path="/about" component={AboutContainer} />
			</Switch>
		</BrowserRouter>
	</div>
);
