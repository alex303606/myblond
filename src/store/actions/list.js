import axios from 'axios';
import { UPDATE_LIST_FAILURE, UPDATE_LIST_SUCCESS } from './actionTypes';

const updateListSuccess = (list) => {
	return {type: UPDATE_LIST_SUCCESS, list};
};

const updateListFailure = error => {
	return {type: UPDATE_LIST_FAILURE, error};
};

export const updateList = () => {
	return dispatch => {
		return axios.get('/list.json').then(
			response => {
				dispatch(updateListSuccess(response.data));
			},
			error => {
				const errorObj = error.response ? error.response.data : {error: 'No internet'};
				dispatch(updateListFailure(errorObj));
			}
		)
	}
};
