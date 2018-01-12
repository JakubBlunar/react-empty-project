import React from 'react';
import PropTypes from 'prop-types';

const InputPreview = props => (
	<div>
		<input
			type="text"
			value={props.value}
			onChange={e => props.onChange(e)}
		/>
	</div>
);

InputPreview.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default InputPreview;
