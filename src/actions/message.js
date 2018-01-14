import {
	START_ADDING_MESSAGE,
	ADD_MESSAGE
} from '../types/message';

function startAddingMessage(message) {
	return {
		type: START_ADDING_MESSAGE,
		payload: {
			message
		}
	};
}

function messageSaved(message) {
	return {
		type: ADD_MESSAGE,
		payload: {
			message
		}
	};
}

export function addMessage(message) {
	return (dispatch) => {
		dispatch(startAddingMessage(message));
		setTimeout(() => {
			dispatch(messageSaved(message));
		}, 5000);
	};
}
