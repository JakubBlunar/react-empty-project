import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRoutes from './routes';

import store from './stores/store';

ReactDOM.render(
	<Provider store={store}>
		<AppRoutes />
	</Provider>,
	// eslint-disable-next-line no-undef
	document.getElementById('app'),
);
