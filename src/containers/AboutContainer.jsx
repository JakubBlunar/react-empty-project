import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Icon } from 'react-fa';
import { map } from 'lodash';

import InputPreview from '../components/InputPreview';
import * as messageActions from '../actions/message';

class IndexContainer extends React.Component {
	static propTypes = {
		messageStore: PropTypes.shape({
			messages: PropTypes.arrayOf(PropTypes.string).isRequired,
			loading: PropTypes.bool.isRequired
		}).isRequired,
		actions: PropTypes.shape({
			addMessage: PropTypes.func.isRequired
		}).isRequired
	};

	render() {
		const loading = this.props.messageStore.loading ? (
			<div>
				<Icon spin name="spinner" />
			</div>) : null;


		const { messages } = this.props.messageStore;
		const mrows = map(messages, (m, index) => (<tr key={index}><td>{m}</td></tr>));
		return (
			<div>
				<Helmet title="About" />
				<h1>ABOUT page</h1>
				<InputPreview
					onChange={e => this.onChange(e)}
					addMessage={this.props.actions.addMessage}
				/>
				<br />
				{loading}

				<table>
					<thead>
						<tr>
							<th>Messages</th>
						</tr>
					</thead>
					<tbody>
						{mrows}
					</tbody>
				</table>

				<br />
				<br />
				<Link to="/">
					<button>Go to index</button>
				</Link>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	messageStore: state.messageStore
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(messageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
