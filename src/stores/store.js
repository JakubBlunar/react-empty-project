import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import messageStore from '../reducers/message';
import authStore from '../reducers/auth';

const config = {
	key: 'root',
	storage,
	blacklist: ['messages']
};

const reducers = {
	messageStore,
	authStore
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
