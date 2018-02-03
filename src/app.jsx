import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-anything-sortable/sortable.css';
import RegistrationPage from './containers/RegistrationPage';
import LoginPage from './containers/LoginPage';
import { history } from './helpers/history';
import MainLayoutContainer from './containers/layout/MainLayoutContainer';
import NotFound from './containers/404';


class AuthRequiredRoute extends Route {
	static propTypes = {
		isLoggedIn: PropTypes.bool.isRequired,
		component: PropTypes.func.isRequired
	};

	render() {
		if (!this.props.isLoggedIn) {
			return <Redirect to="/login" />;
		}
		return <this.props.component {...this.props} />;
	}
}

class App extends Component {
	static propTypes = {
		authStore: PropTypes.shape({
			loggedIn: PropTypes.bool.isRequired
		}).isRequired
	};

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
					defaultTitle="Profizona"
					titleTemplate="%s - Profizona"
				/>
				<ToastContainer />
				<Router history={history}>
					<Switch>
						<AuthRequiredRoute
							exact
							path="/"
							component={MainLayoutContainer}
							isLoggedIn={this.props.authStore.loggedIn}
						/>
						<AuthRequiredRoute
							exact
							path="/about"
							component={MainLayoutContainer}
							isLoggedIn={this.props.authStore.loggedIn}
						/>
						<AuthRequiredRoute
							exact
							path="/administrators"
							component={MainLayoutContainer}
							isLoggedIn={this.props.authStore.loggedIn}
						/>
						<AuthRequiredRoute
							exact
							path="/users"
							component={MainLayoutContainer}
							isLoggedIn={this.props.authStore.loggedIn}
						/>
						<AuthRequiredRoute
							exact
							path="/user/:id"
							component={MainLayoutContainer}
							isLoggedIn={this.props.authStore.loggedIn}
						/>
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/registration" component={RegistrationPage} />
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
