import axios from 'axios'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { 
	SPECIALS_LOADING_FAILURE, 
	SPECIALS_LOADING_REQUEST, 
	SPECIALS_LOADING_SUCCESS, 
	SPECIAL_DELETE_FAILURE, 
	SPECIAL_DELETE_REQUEST, 
	SPECIAL_DELETE_SUCCESS, 
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
} from '../types'

// All Specials load
const loadSpecialAPI = (payload) => {
	return axios.get(`/api/special/skip/${payload}`)
};

function* loadSpecials(action) {
  try {
    const result = yield call(loadSpecialAPI, action.payload);
    console.log(result, "loadSpecials");
    yield put({
      type: SPECIALS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SPECIALS_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchLoadSpecials() {
  yield takeEvery(SPECIALS_LOADING_REQUEST, loadSpecials);
}


// Special Upload
const uploadSpecialAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("/api/special", payload, config);
};

function* uploadSpecials(action) {
  try {
    console.log(action, "uploadSpecial function");
    const result = yield call(uploadSpecialAPI, action.payload);
    console.log(result, "uploadSpecialAPI, action.payload");
    yield put({
      type: SPECIAL_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/special/${result.data._id}`));
  } catch (e) {
    yield put({
      type: SPECIAL_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchuploadSpecials() {
  yield takeEvery(SPECIAL_UPLOADING_REQUEST, uploadSpecials);
}


// Special Detail
const loadSpecialDetailAPI = (payload) => {
	// specialDetail.js useEffect에서 payload: req.match.params.id
	console.log("***special detail payload:",payload)
// type: SPECIALS_DETAIL_LOADING_REQUEST,
// payload: req.match.params.id,
// 위 두줄에서 가져온 payload임
	return axios.get(`/api/special/${payload}`)
};

function* loadSpecialDetail(action) {
	try {
    console.log(action, ": loadSpecialDetail action");
		const result = yield call(loadSpecialDetailAPI, action.payload)
		console.log(result, ": loadspecialDetailapi, auction.payload")
		yield put({
			type: SPECIAL_DETAIL_LOADING_SUCCESS,
			payload: result.data,
		});
	} catch(e) {
		yield put({
			type: SPECIAL_DETAIL_LOADING_FAILURE,
			payload: e
		});
		yield put(push("/"));
	}
}

function* watchloadSpecialDetail() {
	yield takeEvery(SPECIAL_DETAIL_LOADING_REQUEST, loadSpecialDetail)
}


// Special Delete
const DeleteSpecialAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.delete(`/api/special/${payload.id}`, config);
};

function* DeleteSpecial(action) {
  try {
    const result = yield call(DeleteSpecialAPI, action.payload);
    yield put({
      type: SPECIAL_DELETE_SUCCESS,
      payload: result.data,
    });
    yield put(push("/"));
  } catch (e) {
    yield put({
      type: SPECIAL_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchDeleteSpecial() {
  yield takeEvery(SPECIAL_DELETE_REQUEST, DeleteSpecial);
}


// Special Edit Load
const SpecialEditLoadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.get(`/api/special/${payload.id}/edit`, config);
};

function* SpecialEditLoad(action) {
  try {
    const result = yield call(SpecialEditLoadAPI, action.payload);
    yield put({
      type: SPECIAL_EDIT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SPECIAL_EDIT_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchSpecialEditLoad() {
  yield takeEvery(SPECIAL_EDIT_LOADING_REQUEST, SpecialEditLoad);
}


// Special Edit UpLoad
const SpecialEditUploadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.post(`/api/special/${payload.id}/edit`, payload, config);
};

function* SpecialEditUpload(action) {
  try {
    const result = yield call(SpecialEditUploadAPI, action.payload);
    yield put({
      type: SPECIAL_EDIT_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/special/${result.data._id}`))
  } catch (e) {
    yield put({
      type: SPECIAL_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchSpecialEditUpload() {
  yield takeEvery(SPECIAL_EDIT_UPLOADING_REQUEST, SpecialEditUpload);
}


export default function* specialSaga() {
	yield all([ 
    fork(watchLoadSpecials), 
    fork(watchuploadSpecials), 
    fork(watchloadSpecialDetail),
    fork(watchDeleteSpecial),
    fork(watchSpecialEditLoad),
    fork(watchSpecialEditUpload),
  ]);
}