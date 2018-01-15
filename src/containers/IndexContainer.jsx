import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { map } from 'lodash';
import { Button, Container, Header } from 'semantic-ui-react';

import InputPreview from '../components/InputPreview';
import * as messageActions from '../actions/message';
import style from './IndexContainer.scss';
import imgGif from '../../public/images/image.gif';


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
				<img src={imgGif} alt="" />
				<br />
			</div>) : null;


		const { messages } = this.props.messageStore;
		const mrows = map(messages, (m, index) => (<tr key={index}><td>{m}</td></tr>));

		return (
			<div>
				<Helmet title="SOME title" />
				<Container>
					<Header as="h1">Hello world!</Header>

					<Button
						content="Discover docs"
						href="http://react.semantic-ui.com"
						icon="github"
						labelPosition="left"
					/>
				</Container>
				<h1 className={style.header}>Add message</h1>
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
				<Link to="/about">
					<button>Go to About</button>
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
