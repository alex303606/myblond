import {
	UPDATE_LIST_SUCCESS,
	UPDATE_LIST_FAILURE, SELECT_ITEM
} from "../actions/actionTypes";

const initialState = {
	updateListError: null,
	list: [],
	selectedItem: {},
};

const formatListToArray = list => {
	return Object.keys(list).map(x => {
		return {...list[x], id: x};
	});
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_LIST_SUCCESS:
			return {...state, list: formatListToArray(action.list), updateListError: null};
		case UPDATE_LIST_FAILURE:
			return {...state, updateListError: action.error};
		case SELECT_ITEM:
			return {...state, selectedItem: action.item};
		default:
			return state;
	}
};

export default userReducer;
