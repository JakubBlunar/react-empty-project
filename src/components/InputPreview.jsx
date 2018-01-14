import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputPreview extends Component {
	static propTypes = {
		addMessage: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = { message: '' };
	}

	onInputChange = (e) => {
		this.setState({
			message: e.target.value
		});
	}

	handleClick = (e) => {
		e.preventDefault();
		if (this.state.message) {
			this.props.addMessage(this.state.message);
		}
		this.setState({
			message: ''
		});
	}

	render() {
		return (
			<div>
				<input
					type="text"
					value={this.state.message}
					onChange={this.onInputChange}
				/>
				<button onClick={this.handleClick}>Add</button>
			</div>
		);
	}
}

export default InputPreview;
