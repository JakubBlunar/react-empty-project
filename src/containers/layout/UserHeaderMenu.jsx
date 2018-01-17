import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Dropdown, Image } from 'semantic-ui-react';
import { history } from '../../helpers/history';
import * as AuthActions from '../../actions/auth';


class UserHeaderMenu extends Component {
	static propTypes = {
		authStore: PropTypes.shape({
			user: PropTypes.shape({
				name: PropTypes.string
			}).isRequired
		}).isRequired,
		actions: PropTypes.shape({
			logoutUser: PropTypes.func.isRequired
		}).isRequired
	};

	onClickSettings = () => {
		history.push('/account-settings');
	}

	render() {
		const { user } = this.props.authStore;

		const trigger = (
			<span>
				<Image avatar /> {user.name}
			</span>
		);

		return (
			<Dropdown trigger={trigger} pointing>
				<Dropdown.Menu style={{ left: 'auto', right: 0 }}>
					<Dropdown.Header>Account Menu</Dropdown.Header>
					<Dropdown.Item onClick={this.onClickSettings}>Account settings</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item
						onClick={() => this.props.actions.logoutUser()}
					>
						Logout
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

const mapStateToProps = state => ({
	authStore: state.authStore
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHeaderMenu);

