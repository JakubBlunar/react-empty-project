import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { every, values, isString, forOwn } from 'lodash';
import { Button,
	Form,
	Segment
} from 'semantic-ui-react';

import { history } from '../../helpers/history';
import * as AdministratorActions from '../../actions/administrator';

class RegisterForm extends Component {
	static propTypes = {
		token: PropTypes.string.isRequired,
		actions: PropTypes.shape({
			registerAdmin: PropTypes.func.isRequired
		}).isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			formValues: {
				password: '',
				name: '',
				surname: '',
				repPassword: ''
			},
			formErrors: {
				password: '',
				name: '',
				surname: '',
				repPassword: ''
			},
			fields: {
				password: true,
				name: true,
				surname: true,
				repPassword: true
			}
		};
	}

	validateField = (fieldName, value) => {
		const { formErrors, fields } = this.state;

		let valid = false;
		switch (fieldName) {
		case 'name':
		case 'surname':
			valid = value && isString(value);
			formErrors[fieldName] = valid ? '' : `${fieldName} cannot be empty`;
			fields[fieldName] = valid;
			break;
		case 'password':
			valid = value.length >= 6;
			formErrors.password = valid ? '' : 'Password is too short';
			fields[fieldName] = valid;
			break;
		case 'repPassword':
			valid = value === this.state.formValues.password;
			formErrors.repPassword = valid ? '' : 'Passwords does not match';
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

	isValid = () =>
		every(values(this.state.fields), v => v === true);

	revalidate = () => {
		forOwn(this.state.formValues, (key, value) => {
			this.validateField(key, value);
		});
	};

	handleSubmit = () => {
		this.revalidate();
		if (this.isValid()) {
			this.setState({ loading: true });
			this.props.actions.registerAdmin({
				...this.state.formValues,
				token: this.props.token
			}, (success) => {
				this.setState({ loading: false });
				if (success) {
					history.push('/login');
				}
			});
		}
	}

	render() {
		return (
			<Form
				size="large"
				loading={this.state.loading}
				onSubmit={this.handleSubmit}
			>
				<Segment stacked>
					<Form.Input
						fluid
						placeholder="Name"
						name="name"
						onChange={this.handleChange}
						value={this.state.formValues.name}
						error={!this.state.fields.name}
						label={!this.state.fields.name ? this.state.formErrors.name : undefined}
						required
					/>
					<Form.Input
						fluid
						placeholder="Surname"
						name="surname"
						onChange={this.handleChange}
						value={this.state.formValues.surname}
						error={!this.state.fields.surname}
						label={!this.state.fields.surname ? this.state.formErrors.surname : undefined}
						required
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
					<Form.Input
						fluid
						icon="lock"
						iconPosition="left"
						placeholder="Repeat password"
						type="password"
						name="repPassword"
						onChange={this.handleChange}
						value={this.state.formValues.repPassword}
						error={!this.state.fields.repPassword}
						label={!this.state.fields.repPassword ? this.state.formErrors.repPassword : undefined}
					/>
					<Button fluid size="large">Register</Button>
				</Segment>
			</Form>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(AdministratorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
