import { createStore, combineReducers, applyMiddleware } from 'redux';
import messageStore from '../reducers/message';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
    messageStore
});

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk, logger)),
);

export default store;