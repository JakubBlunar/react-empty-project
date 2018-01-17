import {
	USER_LOGIN_REQUEST,
	USERS_LOGIN_FAILURE,
	USER_LOGIN_SUCCESS
} from '../types/auth';

const initState = {
	user: null,
	loading: false,
	loggedIn: false
};

export default (state = initState, action) => {
	switch (action.type) {
	case USER_LOGIN_REQUEST:
		return {
			...state,
			loading: true
		};
	case USER_LOGIN_SUCCESS:
		return {
			...state,
			loading: false,
			loggedIn: true,
			user: action.payload.user
		};
	case USERS_LOGIN_FAILURE:
		return {
			...state,
			loggedIn: false,
			user: null,
			loading: false
		};
	default:
		return state;
	}
};
