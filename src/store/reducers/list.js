import {
	UPDATE_LIST_SUCCESS,
	UPDATE_LIST_FAILURE
} from "../actions/actionTypes";

const initialState = {
	updateListError: null,
	list: [],
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_LIST_SUCCESS:
			return {...state, list: action.list, updateListError: null};
		case UPDATE_LIST_FAILURE:
			return {...state, updateListError: action.error};
		default:
			return state;
	}
};

export default userReducer;
