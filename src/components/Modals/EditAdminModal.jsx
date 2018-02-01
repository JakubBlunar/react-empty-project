import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { every, values, isString, forOwn } from 'lodash';
import { Modal, Button, Form, Checkbox } from 'semantic-ui-react';

import * as AdminActions from '../../actions/administrator';

class EditAdminModal extends React.Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		admin: PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			surname: PropTypes.string.isRequired,
			confirmed: PropTypes.bool.isRequired,
			activated: PropTypes.bool.isRequired,
			email: PropTypes.string.isRequired
		}).isRequired,
		close: PropTypes.func.isRequired,
		actions: PropTypes.shape({
			updateAdmin: PropTypes.func.isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			formValues: {
				name: props.admin.name,
				surname: props.admin.surname,
				confirmed: props.admin.confirmed,
				activated: props.admin.activated,
				email: props.admin.email
			},
			formErrors: {},
			fields: {
				name: true,
				surname: true,
				confirmed: true,
				activated: true,
				email: true
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
		case 'name':
		case 'surname':
			valid = value && isString(value);
			formErrors[fieldName] = valid ? '' : `${fieldName} cannot be empty`;
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
			this.props.actions.updateAdmin(this.props.admin.id, {
				...this.state.formValues
			}, (success) => {
				this.setState({ loading: false });
				if (success) {
					this.props.close(true);
				}
			});
		}
	}

	render() {
		return (
			<Modal
				size="tiny"
				open={this.props.open}
			>
				<Modal.Header>Update administrator</Modal.Header>
				<Modal.Content>
					<Form
						loading={this.state.loading}
					>
						<Form.Input
							fluid
							placeholder="Email"
							name="email"
							onChange={this.handleChange}
							value={this.state.formValues.email}
							error={!this.state.fields.email}
							label={!this.state.fields.email ? this.state.formErrors.email : undefined}
							required
						/>
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
						<Form.Field>
							<Checkbox
								toggle
								label="Confirmed "
								name="confirmed"
								onChange={(e, el) => this.handleChange(e, { name: el.name, value: el.checked })}
								checked={this.state.formValues.confirmed}
							/>
						</Form.Field>
						<Form.Field>
							<Checkbox
								toggle
								label="Activated "
								name="activated"
								onChange={(e, el) => this.handleChange(e, { name: el.name, value: el.checked })}
								checked={this.state.formValues.activated}
							/>
						</Form.Field>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button.Group>
						<Button
							onClick={() => this.props.close(false)}
							content="Cancel"
							icon="close"
							labelPosition="left"
							negative
						/>
						<Button.Or />
						<Button
							positive
							onClick={this.handleSubmit}
							content="Save"
							icon="check"
							labelPosition="right"
						/>
					</Button.Group>
				</Modal.Actions>
			</Modal>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(AdminActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAdminModal);
