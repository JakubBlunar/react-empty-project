import React, { Component } from 'react';
import { Sidebar, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { parseInt, isInteger } from 'lodash';

import { history } from '../../helpers/history';

import HeaderContainer from './Header';
import SidebarContainer from './Sidebar';
import IndexContainer from '../IndexContainer/IndexContainer';
import AboutContainer from '../AboutContainer';
import AdministratorContainer from '../AdministratorsContainer';
import UsersContainer from '../UsersContainer';
import UserDetailContainer from '../UserDetailContainer';

class MainLayoutContainer extends Component {
	static propTypes = {
		computedMatch: PropTypes.shape({
			params: PropTypes.shape({
				id: PropTypes.string
			}).isRequired
		}).isRequired,
		path: PropTypes.string.isRequired
	}

	static defaultTypes = {
		computedMatch: {
			params: {
				id: ''
			}
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			sidebarVisible: false
		};
	}

	toggleSidebar = () => this.setState({ sidebarVisible: !this.state.sidebarVisible });
	clickSidebarItem = (link) => {
		this.setState({ sidebarVisible: false });
		history.push(link);
	};

	render() {
		const { sidebarVisible } = this.state;
		let content;
		const id = parseInt(this.props.computedMatch.params.id);
		switch (this.props.path) {
		case '/about':
			content = <AboutContainer />;
			break;
		case '/administrators':
			content = <AdministratorContainer />;
			break;
		case '/users':
			content = <UsersContainer />;
			break;
		case '/user/:id':
			if (isInteger(id)) {
				content = <UserDetailContainer id={id} />;
			} else {
				history.push('/users');
			}
			break;
		default:
			content = <IndexContainer />;
			break;
		}
		return (
			<div>
				<HeaderContainer toggleSidebar={this.toggleSidebar} />
				<Sidebar.Pushable style={{ minHeight: '100vh', marginTop: 0, border: 'none' }} as={Segment}>
					<SidebarContainer visible={sidebarVisible} onItemClick={this.clickSidebarItem} />
					<Sidebar.Pusher>
						<Segment basic style={{ minHeight: '100vh' }}>
							{content}
						</Segment>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}
}

export default MainLayoutContainer;

