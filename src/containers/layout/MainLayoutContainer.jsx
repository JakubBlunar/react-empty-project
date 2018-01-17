import React, { Component } from 'react';
import { Sidebar, Segment } from 'semantic-ui-react';
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
				<Sidebar.Pushable style={{ minHeight: '100vh', marginTop: 0, border: 'none' }} as={Segment}>
					<SidebarContainer visible={sidebarVisible} />
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

