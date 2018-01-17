import faker from 'faker';
import React, { Component } from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import { history } from '../../helpers/history';

const trigger = (
	<span>
		<Image avatar src={faker.internet.avatar()} /> {faker.name.findName()}
	</span>
);

class UserHeaderMenu extends Component {

	onClickSettings = () => {
		history.push('/account-settings');
	}

	onClickLogout = (e) => {
		console.log('logout');
	};

	render() {
		return (
			<Dropdown trigger={trigger} pointing>
				<Dropdown.Menu>
					<Dropdown.Header>Account Menu</Dropdown.Header>
					<Dropdown.Item onClick={this.onClickSettings}>Account settings</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item onClick={this.onClickLogout}>Logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

export default UserHeaderMenu;
