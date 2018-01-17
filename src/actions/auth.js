import { history } from '../helpers/history';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	// USER_LOGIN_FAILURE,
	USER_LOGOUT
} from '../types/auth';

function userLoginRequest() {
	return {
		type: USER_LOGIN_REQUEST
	};
}
/*
function userLoginFailure() {
	return {
		type: USER_LOGIN_FAILURE
	};
}
*/

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
