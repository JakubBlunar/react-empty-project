import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';

import LoginPage from './containers/LoginPage';
import { history } from './helpers/history';
import MainLayoutContainer from './containers/layout/MainLayoutContainer';
import NotFound from './containers/404';

class App extends Component {
	constructor(props) {
		super(props);

		/*
		const { dispatch } = this.props;
		*/

		history.listen((location, action) => {
			console.log(location, action);
		});
	}

	render() {
		return (
			<div>
				<Helmet
					defaultTitle="My app - MyApp"
					titleTemplate="%s - MyApp"
				/>
				<ToastContainer />
				<Router history={history}>
					<Switch>
						<Route exact path="/" component={MainLayoutContainer} />
						<Route exact path="/about" component={MainLayoutContainer} />
						<Route exact path="/login" component={LoginPage} />
						<Route component={NotFound} />
					</Switch>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	authStore: state.authStore
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
