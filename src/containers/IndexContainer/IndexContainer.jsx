import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { Container } from 'semantic-ui-react';

class IndexContainer extends React.Component {
	render() {
		return (
			<Container>
				<Helmet title="Home" />

				<Link to="/about">
					<button ref={(but) => { this.button = but; }}>Go to About</button>
				</Link>

			</Container>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
