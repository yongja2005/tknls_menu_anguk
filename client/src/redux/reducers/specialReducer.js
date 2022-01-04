import { 
	CATEGORY_FIND_FAILURE,
	CATEGORY_FIND_REQUEST,
	CATEGORY_FIND_SUCCESS,
	SPECIALS_LOADING_FAILURE, 
	SPECIALS_LOADING_REQUEST, 
	SPECIALS_LOADING_SUCCESS, 
	SPECIALS_WRITE_FAILURE, 
	SPECIALS_WRITE_REQUEST, 
	SPECIALS_WRITE_SUCCESS, 
	SPECIAL_DETAIL_LOADING_FAILURE, 
	SPECIAL_DETAIL_LOADING_REQUEST,
	SPECIAL_DETAIL_LOADING_SUCCESS,
	SPECIAL_EDIT_LOADING_FAILURE,
	SPECIAL_EDIT_LOADING_REQUEST,
	SPECIAL_EDIT_LOADING_SUCCESS,
	SPECIAL_EDIT_UPLOADING_FAILURE,
	SPECIAL_EDIT_UPLOADING_REQUEST,
	SPECIAL_EDIT_UPLOADING_SUCCESS,
	SPECIAL_UPLOADING_FAILURE,
	SPECIAL_UPLOADING_REQUEST,
	SPECIAL_UPLOADING_SUCCESS,
	SEARCH_FAILURE,
	SEARCH_REQUEST,
	SEARCH_SUCCESS
} from '../types';

const initialState = {
  isAuthenticated: null,
  specials: [],
  specialDetail: "",
  specialCount: "",
  loading: false,
  error: "",
  creatorId: "",
  categoryFindResult: "",
  title: "",
  searchBy: "",
  searchResult: "",
};

export default function specialReducerFunc(state = initialState, action) {
	switch(action.type) {
		case SPECIALS_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
		case SPECIALS_LOADING_SUCCESS:
			return {
				...state,
				specials: [...state.specials, ...action.payload.specialFindResult],
        categoryFindResult: action.payload.categoryFindResult,
				specialCount: action.payload.specialCount,
				loading: false,
			};
		case SPECIALS_LOADING_FAILURE:
			return {
				...state,
				loading: false,
			};
		case SPECIALS_WRITE_REQUEST:
			return {
				...state,
				specials: [],
				loading: true,
			};
		case SPECIALS_WRITE_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case SPECIALS_WRITE_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case SPECIAL_DETAIL_LOADING_REQUEST:
			return {
				...state,
				specials: [],
				loading: true,
			};
		case SPECIAL_DETAIL_LOADING_SUCCESS:
			return {
				...state,
				loading: false,
				specialDetail: action.payload,
				creatorId: action.payload.creator._id,
				title: action.payload.title,
			};
		case SPECIAL_DETAIL_LOADING_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case SPECIAL_UPLOADING_REQUEST:
			return {
				...state,
				loading: true,
			};
		case SPECIAL_UPLOADING_SUCCESS:
			return {
				...state,
				specials: action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case SPECIAL_UPLOADING_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case SPECIAL_EDIT_LOADING_REQUEST:
			return {
				...state,
				specials: [],
				loading: true,
			};
		case SPECIAL_EDIT_LOADING_SUCCESS:
			return {
				...state,
				specialDetail: action.payload,
				loading: false,
			};
		case SPECIAL_EDIT_LOADING_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case SPECIAL_EDIT_UPLOADING_REQUEST:
			return {
				...state,
				loading: true,
			};
		case SPECIAL_EDIT_UPLOADING_SUCCESS:
			return {
				...state,
				specials: action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case SPECIAL_EDIT_UPLOADING_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case CATEGORY_FIND_REQUEST:
			return {
				...state,
				specials: [],
				loading: true,
			};
		case CATEGORY_FIND_SUCCESS:
			return {
				...state,
				categoryFindResult: action.payload,
				loading: false,
			};
		case CATEGORY_FIND_FAILURE:
			return {
				...state,
				categoryFindResult: action.payload,
				loading: false,
			};
		case SEARCH_REQUEST:
			return {
				...state,
				specials: [],
				searchBy: action.payload,
				loading: true,
			};
		case SEARCH_SUCCESS:
			return {
				...state,
				searchBy: action.payload,
				searchResult: action.payload,
				loading: false,
			};
		case SEARCH_FAILURE:
			return {
				...state,
				searchResult: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}