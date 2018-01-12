import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import InputPreview from '../components/InputPreview';
import * as messageActions from '../actions/message';

class IndexContainer extends React.Component {
	static propTypes = {
		messageStore: PropTypes.shape({
			message: PropTypes.string.isRequired
		}).isRequired,
		actions: PropTypes.shape({
			setMessage: PropTypes.func.isRequired
		}).isRequired
	};

	onChange = (e) => {
		this.props.actions.setMessage(e.target.value);
	};

	render() {
		const { message } = this.props.messageStore;

		return (
			<div>
				<h1>About page</h1>

				<InputPreview
					value={message}
					onChange={e => this.onChange(e)}
				/>
				<br />
				<br />
				<Link to="/">
					<button>Go to index</button>
				</Link>
			</div>);
	}
}

const mapStateToProps = state => ({
	messageStore: state.messageStore
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(messageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
