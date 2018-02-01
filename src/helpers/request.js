import axios from 'axios';
import { times, isArray, map, uniq } from 'lodash';
import { toast } from 'react-toastify';
import { history } from '../helpers/history';


const host = 'http://127.0.0.1:8000';
const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'Access-Control-Allow-Credentials': true
};
const defaultErrorMessage = 'We are sorry but something went wrong.';

export { headers, host };

function processError(error) {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		const { data, status } = error.response;

		if (status === 401) {
			toast.error('You have to be logged in.');
			history.push('/login');
			return;
		}

		if (isArray(data.errors)) {
			const pErrors = uniq(map(data.errors, err => err.error || defaultErrorMessage));
			times(pErrors.length, (i) => {
				toast.error(pErrors[i]);
			});
			return;
		}
	} else if (error.request) {
		// The request was made but no response was received
		console.log(error.request);
	} else {
		console.log('Error', error.message);
	}

	console.log(error.config);
	toast.error(defaultErrorMessage);
}

export function getReq(url, params, callback) {
	const config = {
		headers,
		withCredentials: true
	};

	if (params) {
		config.params = params;
	}

	axios.get(host + url, config).then(res => callback(null, res.data)).catch((err) => {
		processError(err);
		return callback(err, null);
	});
}

export function postReq(url, params, data, callback) {
	const config = {
		headers,
		withCredentials: true
	};

	if (params) {
		config.params = params;
	}

	axios.post(host + url, data || {}, config).then(res => callback(null, res.data)).catch((err) => {
		processError(err);
		return callback(err, null);
	});
}

export function putReq(url, params, data, callback) {
	const config = {
		headers,
		withCredentials: true
	};

	if (params) {
		config.params = params;
	}

	axios.put(host + url, data || {}, config).then(res => callback(null, res.data)).catch((err) => {
		processError(err);
		return callback(err, null);
	});
}

export function deleteReq(url, params, callback) {
	const config = {
		headers,
		withCredentials: true
	};
	if (params) {
		config.params = params;
	}

	axios.delete(host + url, config).then(res => callback(null, res.data)).catch((err) => {
		processError(err);
		return callback(err, null);
	});
}
