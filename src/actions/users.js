import { getReq } from '../helpers/request';

import {
	USERS_LOAD_START,
	USERS_LOAD_FAIL,
	USERS_LOAD_DONE,
	USERS_CHANGE_PAGE_START,
	USERS_CHANGE_PAGE_FAIL,
	USERS_CHANGE_LIMIT_FAIL,
	USERS_CHANGE_LIMIT_START,
	USERS_SEARCH_FAIL,
	USERS_SEARCH_START
} from '../types/users';


function loadStart() {
	return {
		type: USERS_LOAD_START
	};
}

function loadFail() {
	return {
		type: USERS_LOAD_FAIL
	};
}

function loadDone(data) {
	return {
		type: USERS_LOAD_DONE,
		payload: data
	};
}

function changePageStart(page) {
	return {
		type: USERS_CHANGE_PAGE_START,
		payload: {
			page
		}
	};
}

function changePageFail() {
	return {
		type: USERS_CHANGE_PAGE_FAIL
	};
}

function changeLimitStart(limit) {
	return {
		type: USERS_CHANGE_LIMIT_START,
		payload: {
			limit
		}
	};
}

function changeLimitFail() {
	return {
		type: USERS_CHANGE_LIMIT_FAIL
	};
}

function changeSearchFail() {
	return {
		type: USERS_SEARCH_FAIL
	};
}

function changeSearchStart(searchString) {
	return {
		type: USERS_SEARCH_START,
		payload: {
			search: searchString
		}
	};
}

function loadUsers(dispatch, getState, fail) {
	const users = getState().userStore;
	const params = {
		p: users.page,
		l: users.limit,
		s: users.search
	};
	getReq('/users', params, (err, res) => {
		if (err) {
			return dispatch(fail());
		}
		return dispatch(loadDone(res));
	});
}

export function changeSearch(searchString) {
	return (dispatch, getState) => {
		dispatch(changeSearchStart(searchString));
		loadUsers(dispatch, getState, changeSearchFail);
	};
}

export function changeLimit(limit) {
	return (dispatch, getState) => {
		dispatch(changeLimitStart(limit));
		loadUsers(dispatch, getState, changeLimitFail);
	};
}

export function changePage(page) {
	return (dispatch, getState) => {
		dispatch(changePageStart(page));
		loadUsers(dispatch, getState, changePageFail);
	};
}

export function reloadUsers() {
	return (dispatch, getState) => {
		dispatch(loadStart());
		loadUsers(dispatch, getState, loadFail);
	};
}
