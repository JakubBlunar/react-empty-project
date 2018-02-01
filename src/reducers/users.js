import {
	USERS_CHANGE_LIMIT_FAIL,
	USERS_CHANGE_LIMIT_START,
	USERS_LOAD_FAIL,
	USERS_LOAD_DONE,
	USERS_LOAD_START,
	USERS_CHANGE_PAGE_FAIL,
	USERS_CHANGE_PAGE_START,
	USERS_SEARCH_FAIL,
	USERS_SEARCH_START
} from '../types/users';

const initState = {
	users: [],
	limit: 20,
	count: 0,
	page: 1,
	pages: 1,
	search: '',
	prevLimit: 20,
	prevPage: 1,
	prevSearch: '',
	loading: false
};

export default (state = initState, action) => {
	switch (action.type) {
	case USERS_LOAD_START:
		return {
			...state,
			loading: true
		};
	case USERS_LOAD_DONE:
		return {
			...state,
			loading: false,
			users: action.payload.users,
			limit: action.payload.limit,
			page: action.payload.page,
			pages: action.payload.pages,
			count: action.payload.count
		};
	case USERS_LOAD_FAIL:
		return {
			...state,
			loading: false,
			page: state.prevPage,
			limit: state.prevLimit,
			search: state.prevSearch
		};
	case USERS_CHANGE_LIMIT_START:
		return {
			...state,
			loading: true,
			prevPage: state.page,
			page: 1,
			prevLimit: state.limit,
			limit: action.payload.limit
		};
	case USERS_CHANGE_LIMIT_FAIL:
		return {
			...state,
			loading: false,
			limit: state.prevLimit
		};
	case USERS_CHANGE_PAGE_START:
		return {
			...state,
			loading: true,
			prevPage: state.page,
			page: action.payload.page
		};
	case USERS_CHANGE_PAGE_FAIL:
		return {
			...state,
			loading: false,
			page: state.prevPage
		};
	case USERS_SEARCH_FAIL:
		return {
			...state,
			loading: false,
			search: state.prevSearch,
			prevPage: state.page,
			page: 1
		};
	case USERS_SEARCH_START:
		return {
			...state,
			loading: true,
			prevSearch: state.search,
			search: action.payload.search,
			prevPage: state.page,
			page: 1
		};
	default:
		return state;
	}
};
