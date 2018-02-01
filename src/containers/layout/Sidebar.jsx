import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SidebarContainer = props => (
	<Sidebar as={Menu} animation="uncover" width="thin" visible={props.visible} icon="labeled" vertical inverted>
		<Menu.Item name="home" onClick={() => props.onItemClick('/')}>
			<Icon name="home" />
			Home
		</Menu.Item>
		<Menu.Item name="users" onClick={() => props.onItemClick('/users')}>
			<Icon name="users" />
			Users
		</Menu.Item>
		<Menu.Item name="administrators" onClick={() => props.onItemClick('/administrators')}>
			<Icon name="users" />
			Administrators
		</Menu.Item>
	</Sidebar>
);

SidebarContainer.propTypes = {
	visible: PropTypes.bool.isRequired,
	onItemClick: PropTypes.func.isRequired
};

export default SidebarContainer;

