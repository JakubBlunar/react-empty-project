import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Input, Modal, Button, Divider } from 'semantic-ui-react';
import * as AdministratorActions from '../../actions/administrator';

class InviteAdministratorModal extends React.Component {
	static propTypes = {
		reloadAdministrators: PropTypes.func.isRequired,
		actions: PropTypes.shape({
			inviteAdministrator: PropTypes.func.isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			emailError: '',
			hasError: false,
			modalOpen: false
		};
	}

	onChange = (e, { name, value }) => {
		this.setState({ [name]: value }, () => this.validateField(name, value));
	};

	validateField = (fieldName, value) => {
		let errorMessage = '';
		let valid = false;
		switch (fieldName) {
		case 'email':
			valid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
			errorMessage = valid ? '' : 'Email is invalid';
			break;
		default:
			break;
		}

		this.setState({
			emailError: errorMessage,
			hasError: !valid
		});
	}

	submit = () => {
		const { email } = this.state;

		this.validateField('email', email);
		if (!this.state.hasError) {
			this.props.actions.inviteAdministrator(email, (success) => {
				if (success) {
					this.setState({ modalOpen: false });
					this.props.reloadAdministrators();
				}
			});
		}
	};

	render() {
		const button = (<Button floated="right">Invite administrator</Button>);
		return (
			<Modal
				trigger={button}
				size="tiny"
				open={this.state.modalOpen}
				onOpen={() => this.setState({ modalOpen: true })}
			>
				<Modal.Header>Invite administrator</Modal.Header>
				<Modal.Content>
					Please enter administrator email. He will get email with instructions to register.
					<Divider hidden />
					<Input
						onChange={this.onChange}
						icon={this.state.hasError ? undefined : 'at'}
						iconPosition={this.state.hasError ? undefined : 'left'}
						placeholder="email address..."
						name="email"
						fluid
						value={this.state.email}
						error={this.state.hasError}
						label={this.state.hasError ? this.state.emailError : undefined}
					/>
				</Modal.Content>
				<Modal.Actions>
					<Button.Group>
						<Button
							onClick={() => this.setState({ modalOpen: false })}
							content="Cancel"
							icon="close"
							labelPosition="left"
							negative
						/>
						<Button.Or />
						<Button
							positive
							onClick={this.submit}
							content="Invite"
							icon="check"
							labelPosition="right"
							disabled={this.state.hasError}
						/>
					</Button.Group>
				</Modal.Actions>
			</Modal>
		);
	}
}

const mapStateToProps = state => ({
	administratorsStore: state.administratorsStore
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(AdministratorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteAdministratorModal);
