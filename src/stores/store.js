import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import messageStore from '../reducers/message';

const reducers = combineReducers({
	messageStore
});

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
