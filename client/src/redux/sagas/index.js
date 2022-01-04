import { all, fork } from "redux-saga/effects";
import axios from "axios";

import authSaga from "./authSaga";
import postSaga from './postSaga';
import commentSaga from './commentSaga';
import specialSaga from './specialSaga'

import dotenv from "dotenv";
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

// function* => generater function: 여러값 반환하는 함수
export default function* rootSaga() {
  yield all([fork(authSaga), fork(postSaga), fork(commentSaga), fork(specialSaga) ]);
}

