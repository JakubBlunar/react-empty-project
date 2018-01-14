import {
	START_ADDING_MESSAGE,
	ADD_MESSAGE
} from '../types/message';

const initState = {
	messages: [],
	loading: false
};

export default (state = initState, action) => {
	switch (action.type) {
	case START_ADDING_MESSAGE:
		return {
			...state,
			loading: true
		};
	case ADD_MESSAGE:
		return {
			...state,
			messages: state.messages.concat(action.payload.message),
			loading: false
		};
	default:
		return state;
	}
};
