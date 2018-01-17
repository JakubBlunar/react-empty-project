import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	Grid,
	Header
} from 'semantic-ui-react';
import LoginForm from '../components/Forms/LoginForm';

class LoginPage extends Component {
	render() {
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
							Log-in to your account
						</Header>
						<LoginForm ref={(form) => { this.loginForm = form; }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
