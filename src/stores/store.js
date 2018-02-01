import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';

import storage from 'redux-persist/lib/storage';

// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import authStore from '../reducers/auth';
import administratorsStore from '../reducers/administrators';
import userStore from '../reducers/users';

const blackListAuthstore = createBlacklistFilter(
	'authStore',
	['loading']
);

const config = {
	key: 'root',
	storage,
	blacklist: ['administratorsStore', 'userStore'],
	transforms: [blackListAuthstore]
};

const reducers = {
	authStore,
	administratorsStore,
	userStore
};

const reducer = persistCombineReducers(config, reducers);
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

export default function configureStore() {
	const store = createStore(
		reducer,
		composeWithDevTools(applyMiddleware(...middlewares))
	);
	const persistor = persistStore(store);
	return { persistor, store };
}
