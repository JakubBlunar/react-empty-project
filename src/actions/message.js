import { SET_MESSAGE } from '../types/message';

function changeMessage(message) {
	return {
		type: SET_MESSAGE,
		payload: {
			message
		}
	};
}

export function setMessage(message) {
	return (dispatch) => {
		dispatch(changeMessage(message));
	};
}
