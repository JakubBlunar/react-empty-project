import { toast } from 'react-toastify';
import { history } from '../helpers/history';

import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USERS_LOGIN_FAILURE
} from '../types/auth';

function userLoginRequest() {
	return {
		type: USER_LOGIN_REQUEST
	};
}

function userLoginFailure() {
	return {
		type: USERS_LOGIN_FAILURE
	}
}

function userLoginSuccess(user) {
	return {
		type: USER_LOGIN_SUCCESS,
		payload: {
			user
		}
	}
}

export function logInUser(userLoginData) {
	return (dispatch, getStore) => {
		console.log(userLoginData);
		dispatch(userLoginRequest());
		setTimeout(() => {
			dispatch(userLoginSuccess({
				id: 10,
				name: 'Jakub'
			}));
			history.push('/');
		}, 2000);
	};
}
