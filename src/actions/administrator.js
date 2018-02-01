import { toast } from 'react-toastify';
import { postReq, deleteReq, putReq } from '../helpers/request';


export function inviteAdministrator(email, callback) {
	return () => {
		postReq('/administrators', null, { email }, (err) => {
			if (err) {
				return callback(false);
			}

			toast.success('Administrator has been successfully invited.');
			return callback(true);
		});
	};
}

export function registerAdmin(data, callback) {
	return () => {
		postReq('/registration/complete', null, data, (err) => {
			if (err) {
				return callback(false);
			}

			toast.success('Administrator has been successfully registered.');
			return callback(true);
		});
	};
}

export function removeAdministrator(id, callback) {
	return () => {
		deleteReq(`/administrators/${id}`, null, (err) => {
			if (err) {
				return callback(false);
			}

			toast.success('Administrator has been successfully removed.');
			return callback(true);
		});
	};
}

export function updateAdmin(id, data, callback) {
	return () => {
		putReq(`/administrators/${id}`, null, data, (err) => {
			if (err) {
				return callback(false);
			}

			toast.success('Administrator has been successfully updated.');
			return callback(true);
		});
	};
}

