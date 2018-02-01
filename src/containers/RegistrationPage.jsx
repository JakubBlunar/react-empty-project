import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	Grid,
	Header,
	Message
} from 'semantic-ui-react';
import { history } from '../helpers/history';
import RegisterForm from '../components/Forms/RegisterForm';

class RegistrationPage extends Component {
	static propTypes = {
		location: PropTypes.shape({
			search: PropTypes.string.isRequired
		}).isRequired
	};

	componentDidMount() {
		const { token } = queryString.parse(this.props.location.search);
		if (!token) {
			history.push('/login');
		}
	}

	render() {
		const { token } = queryString.parse(this.props.location.search);

		return (
			<div className="login-form">
				<style>{`
					body > div,
					body > div > div,
					body > div > div > div.login-form {
						height: 100%;
					}
				`}
				</style>
				<Grid
					textAlign="center"
					style={{ height: '100%' }}
					verticalAlign="middle"
				>
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as="h2" textAlign="center">
							Register your account
						</Header>
						<RegisterForm token={token || 'empty-token'} ref={(form) => { this.loginForm = form; }} />
						<Message>
							Already registered? <Link to="/login">Sign in</Link>
						</Message>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	messageStore: state.messageStore
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
