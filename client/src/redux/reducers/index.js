import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer";
import postReducer from "./postReducer"
import commentReducer from "./commentReducer"
import specialReducer from "./specialReducer"

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    post: postReducer,
    comment:commentReducer,
    special: specialReducer,
  });


export default createRootReducer;