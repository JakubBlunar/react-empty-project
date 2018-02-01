import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import * as AdministratorActions from '../../actions/administrator';

class RemoveAdminModal extends React.Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		close: PropTypes.func.isRequired,
		admin: PropTypes.shape({
			id: PropTypes.number.isRequired,
			fullName: PropTypes.string.isRequired
		}).isRequired,
		actions: PropTypes.shape({
			removeAdministrator: PropTypes.func.isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	setLoading = (loading) => {
		this.setState({
			loading
		});
	}

	submit = () => {
		this.setLoading(true);
		this.props.actions.removeAdministrator(this.props.admin.id, (success) => {
			this.setLoading(false);
			if (success) {
				this.props.close(true);
			}
		});
	};


	render() {
		return (
			<Modal
				size="tiny"
				open={this.props.open}
			>
				<Modal.Header>Remove administrator</Modal.Header>
				<Modal.Content>
					Do you want to remove {this.props.admin.fullName}?
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
							onClick={this.submit}
							content="Remove"
							icon="check"
							labelPosition="right"
							disabled={this.state.loading}
							loading={this.state.loading}
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
	actions: bindActionCreators(AdministratorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveAdminModal);
