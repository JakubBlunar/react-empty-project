import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import InputPreview from '../components/InputPreview';
import * as messageActions from '../actions/message';
import style from './IndexContainer.scss';
import imgGif from '../../public/images/image.gif';

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
				<h1 className={style.header}>Index page</h1>
				<img src={imgGif} alt="" />
				<br />
				<br />
				<br />
				<InputPreview
					value={message}
					onChange={e => this.onChange(e)}
				/>
				<br />
				<br />
				<Link to="/about">
					<button>Go to About</button>
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
