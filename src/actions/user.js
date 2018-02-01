import { toast } from 'react-toastify';
import { deleteReq, getReq, putReq } from '../helpers/request';

export function removeUser(id, callback) {
	return () => {
		deleteReq(`/users/${id}`, null, (err) => {
			if (err) {
				return callback(false);
			}

			toast.success('User has been successfully removed.');
			return callback(true);
		});
	};
}

export function loadUser(id, callback) {
	return () => {
		getReq(`/users/${id}`, null, (err, res) => {
			if (err) {
				return callback(null);
			}
			return callback(res);
		});
	};
}

export function updateUser(data, callback) {
	return () => {
		putReq(`/users/${data.id}`, null, data, (err) => {
			if (err) {
				return callback(err);
			}
			toast.success('User has been successfully updated.');
			return callback(null);
		});
	};
}
