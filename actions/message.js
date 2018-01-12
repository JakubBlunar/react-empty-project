import { SET_MESSAGE } from '../types/message';

function changeMessage(message) {
    return {
        type: SET_MESSAGE,
        payload: {
            message
        }
    };
}

export function setMessage(message){
    return (dispatch, getStore) => {
        dispatch(changeMessage(message));
    }
}
