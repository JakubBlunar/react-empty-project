import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { every, values } from 'lodash';
import { Button,
	Form,
	Segment,
	Checkbox
} from 'semantic-ui-react';
import * as authActions from '../../actions/auth';

class LoginForm extends Component {
	static propTypes = {
		authStore: PropTypes.shape({
			loading: PropTypes.bool.isRequired
		}).isRequired,
		actions: PropTypes.shape({
			logInUser: PropTypes.func.isRequired
		}).isRequired
	}

	constructor(props) {
		super(props);

		this.state = {
			formValues: {
				password: '',
				email: '',
				remember: false
			},
			formErrors: {
				email: '',
				password: ''
			},
			fields: {
				email: true,
				password: true,
				remember: true
			}
		};
	}

	validateField = (fieldName, value) => {
		const { formErrors, fields } = this.state;
		let valid = false;
		switch (fieldName) {
		case 'email':
			valid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
			formErrors.email = valid ? '' : 'Email is invalid';
			fields[fieldName] = valid;
			break;
		case 'password':
			valid = value.length >= 6;
			formErrors.password = valid ? '' : 'Password is too short';
			fields[fieldName] = valid;
			break;
		default:
			break;
		}
		this.setState({
			formErrors,
			fields
		}, this.validateForm);
	}

	handleChange = (e, { name, value }) => this.setState(
		{ formValues: { ...this.state.formValues, [name]: value } },
		() => { this.validateField(name, value); }
	);

	handleCustomFieldChange = (name, type, value) => {
		this.setState(
			{ formValues: { ...this.state.formValues, [name]: value } },
			() => { this.validateField(name, value); }
		);
	}

	isValid = () =>
		every(values(this.state.fields), v => v === true);

	handleSubmit = () => {
		if (this.isValid()) {
			this.props.actions.logInUser({
				...this.state.formValues
			});
		}
	}

	render() {
		return (
			<Form
				size="large"
				loading={this.props.authStore.loading}
				onSubmit={this.handleSubmit}
			>
				<Segment stacked>
					<Form.Input
						fluid
						icon="user"
						iconPosition="left"
						placeholder="E-mail address"
						name="email"
						onChange={this.handleChange}
						value={this.state.formValues.email}
						error={!this.state.fields.email}
						label={!this.state.fields.email ? this.state.formErrors.email : undefined}
					/>
					<Form.Input
						fluid
						icon="lock"
						iconPosition="left"
						placeholder="Password"
						type="password"
						name="password"
						onChange={this.handleChange}
						value={this.state.formValues.password}
						error={!this.state.fields.password}
						label={!this.state.fields.password ? this.state.formErrors.password : undefined}
					/>
					<Form.Field>
						<Checkbox
							toggle
							label="Remember me"
							name="remember"
							onChange={(e, el) => this.handleCustomFieldChange(el.name, el.type, el.checked)}
							checked={this.state.formValues.remember}
						/>
					</Form.Field>
					<Button fluid size="large">Login</Button>
				</Segment>
			</Form>
		);
	}
}

const mapStateToProps = state => ({
	authStore: state.authStore
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(authActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
