import axios from 'axios';
import { SELECT_ITEM, UPDATE_LIST_FAILURE, UPDATE_LIST_SUCCESS } from './actionTypes';

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
				return dispatch(updateListSuccess(response.data));
			},
			error => {
				const errorObj = error.response ? error.response.data : {error: 'No internet'};
				return dispatch(updateListFailure(errorObj));
			}
		)
	}
};

export const deleteItemList = index => {
	return dispatch => {
		return axios.delete(`/list/${index}.json`).then(() => {
			dispatch(updateList());
		});
	}
};

export const editItemList = (index, item) => {
	return dispatch => {
		return axios.put(`/list/${index}.json`, item).then(() => {
			dispatch(updateList());
			dispatch(selectItem({}));
		});
	}
};

export const addItemList = (item) => {
	return dispatch => {
		return axios.post('/list.json', item).then(() => {
			dispatch(updateList());
		});
	}
};

export const selectItem = item => {
	return dispatch => {
		return dispatch({type: SELECT_ITEM, item});
	}
};
