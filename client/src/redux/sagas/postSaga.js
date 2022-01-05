import axios from 'axios'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { 
	POSTS_LOADING_FAILURE, 
	POSTS_LOADING_REQUEST, 
	POSTS_LOADING_SUCCESS, 
	POST_DELETE_FAILURE, 
	POST_DELETE_REQUEST, 
	POST_DELETE_SUCCESS, 
	POST_DETAIL_LOADING_FAILURE, 
	POST_DETAIL_LOADING_REQUEST, 
	POST_DETAIL_LOADING_SUCCESS, 
	POST_EDIT_LOADING_FAILURE, 
	POST_EDIT_LOADING_REQUEST, 
	POST_EDIT_LOADING_SUCCESS, 
	POST_EDIT_UPLOADING_FAILURE, 
	POST_EDIT_UPLOADING_REQUEST, 
	POST_EDIT_UPLOADING_SUCCESS, 
	POST_UPLOADING_FAILURE, 
	POST_UPLOADING_REQUEST, 
	POST_UPLOADING_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS
} from '../types'

// All Posts load
const loadPostAPI = (payload) => {
	return axios.get(`/api/post/skip/${payload}`)
};

function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.payload);
    console.log(result, "loadPosts");
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}


// Post Upload
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("/api/post", payload, config);
};

function* uploadPosts(action) {
  try {
    console.log(action, "uploadPost function");
    const result = yield call(uploadPostAPI, action.payload);
    console.log(result, "uploadPostAPI, action.payload");
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchuploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}


// Post Detail
const loadPostDetailAPI = (payload) => {
	// postDetail.js useEffect에서 payload: req.match.params.id
	console.log("***post detail payload:",payload)
// type: POSTS_DETAIL_LOADING_REQUEST,
// payload: req.match.params.id,
// 위 두줄에서 가져온 payload임
	return axios.get(`/api/post/${payload}`)
};

function* loadPostDetail(action) {
	try {
    console.log(action, ": loadPostDetail action");
		const result = yield call(loadPostDetailAPI, action.payload)
		console.log(result, ": loadpostDetailapi, auction.payload")
		yield put({
			type: POST_DETAIL_LOADING_SUCCESS,
			payload: result.data,
		});
	} catch(e) {
		yield put({
			type: POST_DETAIL_LOADING_FAILURE,
			payload: e
		});
		yield put(push("/"));
	}
}

function* watchloadPostDetail() {
	yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail)
}


// Post Delete
const DeletePostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.delete(`/api/post/${payload.id}`, config);
};

function* DeletePost(action) {
  try {
    const result = yield call(DeletePostAPI, action.payload);
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    });
    yield put(push("/"));
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, DeletePost);
}


// Post Edit Load
const PostEditLoadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.get(`/api/post/${payload.id}/edit`, config);
};

function* PostEditLoad(action) {
  try {
    const result = yield call(PostEditLoadAPI, action.payload);
    yield put({
      type: POST_EDIT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_EDIT_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchPostEditLoad() {
  yield takeEvery(POST_EDIT_LOADING_REQUEST, PostEditLoad);
}


// Post Edit UpLoad
const PostEditUploadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* PostEditUpload(action) {
  try {
    const result = yield call(PostEditUploadAPI, action.payload);
    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`))
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchPostEditUpload() {
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, PostEditUpload);
}

// Search
const SearchResultAPI = (payload) => {
  //encodeURIComponent mdn 찾아보기.. 한글들을 utf-8로 변경해줌
  return axios.get(`/api/search/${encodeURIComponent(payload)}`);
};

function* SearchResult(action) {
  try {
    const result = yield call(SearchResultAPI, action.payload);
    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data,
    });
    // 검색을 한 후에 엔터를 누르면 그 화면으로 넘어갈 수 있게
    yield put(push(`/search/${encodeURIComponent(action.payload)}`))
  } catch (e) {
    yield put({
      type: SEARCH_FAILURE,
      payload: e,
    });
    yield put(push("/"))
  }
}

function* watchSearchResult() {
  yield takeEvery(SEARCH_REQUEST, SearchResult);
}




export default function* postSaga() {
	yield all([ 
    fork(watchLoadPosts), 
    fork(watchuploadPosts), 
    fork(watchloadPostDetail),
    fork(watchDeletePost),
    fork(watchPostEditLoad),
    fork(watchPostEditUpload),
    fork(watchSearchResult),
  ]);
}