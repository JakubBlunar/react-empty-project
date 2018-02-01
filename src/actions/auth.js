import { history } from '../helpers/history';
import { postReq } from '../helpers/request';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_LOGOUT
} from '../types/auth';

function userLoginRequest() {
	return {
		type: USER_LOGIN_REQUEST
	};
}

function userLoginFailure() {
	return {
		type: USER_LOGIN_FAILURE
	};
}


function userLoginSuccess(user) {
	return {
		type: USER_LOGIN_SUCCESS,
		payload: {
			user
		}
	};
}

function logout() {
	return {
		type: USER_LOGOUT
	};
}

export function logoutUser() {
	return (dispatch) => {
		dispatch(logout());
	};
}

export function logInUser(userLoginData) {
	return (dispatch) => {
		dispatch(userLoginRequest());
		postReq('/admin/api/login', null, userLoginData, (err, user) => {
			if (err) {
				return dispatch(userLoginFailure());
			}
			dispatch(userLoginSuccess(user));
			return history.push('/');
		});
	};
}
