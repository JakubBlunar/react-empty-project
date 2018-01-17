import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import 'semantic-ui-less/semantic.less';
import '../semantic-theme/semantic.less';
import App from './app';

import configureStore from './stores/store';

const { persistor, store } = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<PersistGate
			loading="Loading"
			persistor={persistor}
		>
			<App />
		</PersistGate>

	</Provider>,
	// eslint-disable-next-line no-undef
	document.getElementById('app'),
);
