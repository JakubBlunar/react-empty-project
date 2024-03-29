import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';

class IndexContainer extends React.Component {
	render() {
		return (
			<div>
				<Helmet title="About" />
				<h1>ABOUT page</h1>

				<Link to="/">
					<button ref={(but) => { this.button = but; }}>Go to index</button>
				</Link>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	messageStore: state.messageStore
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
