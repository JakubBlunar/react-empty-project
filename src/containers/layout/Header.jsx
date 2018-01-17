import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './Header.scss';
import UserHeaderMenu from './UserHeaderMenu';

const HeaderContainer = (props) => {
	return (
		<Menu className={style.menu}>
			<Menu.Item>
				<Button onClick={() => props.toggleSidebar()}>Toggle Sidebar</Button>
			</Menu.Item>
			<Menu.Item as={Link} to="/" >Home</Menu.Item>
			<Menu.Item as={Link} to="/about">About</Menu.Item>

			<Menu.Item position="right">
				<UserHeaderMenu />
			</Menu.Item>
		</Menu>
	);
};


HeaderContainer.propTypes = {
	toggleSidebar: PropTypes.func.isRequired
};

export default HeaderContainer;
