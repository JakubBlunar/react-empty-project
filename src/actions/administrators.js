import { getReq } from '../helpers/request';

import {
	ADMINISTRATORS_LOAD_START,
	ADMINISTRATORS_LOAD_FAIL,
	ADMINISTRATORS_LOAD_DONE,
	ADMINISTRATORS_CHANGE_PAGE_START,
	ADMINISTRATORS_CHANGE_PAGE_FAIL,
	ADMINISTRATORS_CHANGE_LIMIT_FAIL,
	ADMINISTRATORS_CHANGE_LIMIT_START,
	ADMINISTRATORS_SEARCH_FAIL,
	ADMINISTRATORS_SEARCH_START
} from '../types/administrators';


function loadStart() {
	return {
		type: ADMINISTRATORS_LOAD_START
	};
}

function loadFail() {
	return {
		type: ADMINISTRATORS_LOAD_FAIL
	};
}

function loadDone(data) {
	return {
		type: ADMINISTRATORS_LOAD_DONE,
		payload: data
	};
}

function changePageStart(page) {
	return {
		type: ADMINISTRATORS_CHANGE_PAGE_START,
		payload: {
			page
		}
	};
}

function changePageFail() {
	return {
		type: ADMINISTRATORS_CHANGE_PAGE_FAIL
	};
}

function changeLimitStart(limit) {
	return {
		type: ADMINISTRATORS_CHANGE_LIMIT_START,
		payload: {
			limit
		}
	};
}

function changeLimitFail() {
	return {
		type: ADMINISTRATORS_CHANGE_LIMIT_FAIL
	};
}

function changeSearchFail() {
	return {
		type: ADMINISTRATORS_SEARCH_FAIL
	};
}

function changeSearchStart(searchString) {
	return {
		type: ADMINISTRATORS_SEARCH_START,
		payload: {
			search: searchString
		}
	};
}

function loadAdmins(dispatch, getState, fail) {
	const admins = getState().administratorsStore;
	const params = {
		p: admins.page,
		l: admins.limit,
		s: admins.search
	};
	getReq('/administrators', params, (err, res) => {
		if (err) {
			return dispatch(fail());
		}
		return dispatch(loadDone(res));
	});
}

export function changeSearch(searchString) {
	return (dispatch, getState) => {
		dispatch(changeSearchStart(searchString));
		loadAdmins(dispatch, getState, changeSearchFail);
	};
}

export function changeLimit(limit) {
	return (dispatch, getState) => {
		dispatch(changeLimitStart(limit));
		loadAdmins(dispatch, getState, changeLimitFail);
	};
}

export function changePage(page) {
	return (dispatch, getState) => {
		dispatch(changePageStart(page));
		loadAdmins(dispatch, getState, changePageFail);
	};
}

export function reloadAdministrators() {
	return (dispatch, getState) => {
		dispatch(loadStart());
		loadAdmins(dispatch, getState, loadFail);
	};
}
