import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SidebarContainer = props => (
	<Sidebar as={Menu} animation="uncover" width="thin" visible={props.visible} icon="labeled" vertical inverted>
		<Menu.Item name="home" as={Link} to="/">
			<Icon name="home" />
			Home
		</Menu.Item>
		<Menu.Item name="articles" as={Link} to="/articles">
			<Icon name="newspaper" />
			Articles
		</Menu.Item>
	</Sidebar>
);

SidebarContainer.propTypes = {
	visible: PropTypes.bool.isRequired
};

export default SidebarContainer;

