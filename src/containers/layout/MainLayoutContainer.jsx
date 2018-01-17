import React, { Component } from 'react';
import { Sidebar, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import HeaderContainer from './Header';
import SidebarContainer from './Sidebar';
import IndexContainer from '../IndexContainer';
import AboutContainer from '../AboutContainer';


class MainLayoutContainer extends Component {
	static propTypes = {
		location: PropTypes.shape({
			pathname: PropTypes.string.isRequired
		}).isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			sidebarVisible: false
		};
	}

	toggleSidebar = () => this.setState({ sidebarVisible: !this.state.sidebarVisible })

	render() {
		const { sidebarVisible } = this.state;

		let content;
		switch (this.props.location.pathname) {
		case '/about':
			content = <AboutContainer />;
			break;
		default:
			content = <IndexContainer />;
			break;
		}
		return (
			<div>
				<HeaderContainer toggleSidebar={this.toggleSidebar} />
				<Sidebar.Pushable style={{ minHeight: '100vh' }}>
					<SidebarContainer visible={sidebarVisible} />
					<Sidebar.Pusher>
						<Container>
							{content}
						</Container>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}
}

export default MainLayoutContainer;

