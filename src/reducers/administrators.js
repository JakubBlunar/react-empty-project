import {
	ADMINISTRATORS_CHANGE_LIMIT_FAIL,
	ADMINISTRATORS_CHANGE_LIMIT_START,
	ADMINISTRATORS_LOAD_FAIL,
	ADMINISTRATORS_LOAD_DONE,
	ADMINISTRATORS_LOAD_START,
	ADMINISTRATORS_CHANGE_PAGE_FAIL,
	ADMINISTRATORS_CHANGE_PAGE_START,
	ADMINISTRATORS_SEARCH_FAIL,
	ADMINISTRATORS_SEARCH_START
} from '../types/administrators';

const initState = {
	administrators: [],
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
	case ADMINISTRATORS_LOAD_START:
		return {
			...state,
			loading: true
		};
	case ADMINISTRATORS_LOAD_DONE:
		return {
			...state,
			loading: false,
			administrators: action.payload.administrators,
			limit: action.payload.limit,
			page: action.payload.page,
			pages: action.payload.pages,
			count: action.payload.count
		};
	case ADMINISTRATORS_LOAD_FAIL:
		return {
			...state,
			loading: false,
			page: state.prevPage,
			limit: state.prevLimit,
			search: state.prevSearch
		};
	case ADMINISTRATORS_CHANGE_LIMIT_START:
		return {
			...state,
			loading: true,
			prevPage: state.page,
			page: 1,
			prevLimit: state.limit,
			limit: action.payload.limit
		};
	case ADMINISTRATORS_CHANGE_LIMIT_FAIL:
		return {
			...state,
			loading: false,
			limit: state.prevLimit
		};
	case ADMINISTRATORS_CHANGE_PAGE_START:
		return {
			...state,
			loading: true,
			prevPage: state.page,
			page: action.payload.page
		};
	case ADMINISTRATORS_CHANGE_PAGE_FAIL:
		return {
			...state,
			loading: false,
			page: state.prevPage
		};
	case ADMINISTRATORS_SEARCH_FAIL:
		return {
			...state,
			loading: false,
			search: state.prevSearch,
			prevPage: state.page,
			page: 1
		};
	case ADMINISTRATORS_SEARCH_START:
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
