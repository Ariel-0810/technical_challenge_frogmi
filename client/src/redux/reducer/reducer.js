import {
    GET_FEATURES_REQUEST,
    GET_FEATURES_SUCCESS,
    GET_FEATURES_FAILURE,
} from "../actions/types"

const initialState = {
	features: [],
	loading: false,
	error: null,
  };
  
  const reducer = (state = initialState, action) => {
	switch (action.type) {
	  case GET_FEATURES_REQUEST:
		return {
		  ...state,
		  loading: true,
		  error: null,
		};
	  case GET_FEATURES_SUCCESS:
		return {
		  ...state,
		  loading: false,
		  features: action.payload,
		};
	  case GET_FEATURES_FAILURE:
		return {
		  ...state,
		  loading: false,
		  error: action.payload,
		};
	  default:
		return {...state};
	}
  };
  
  export default reducer;