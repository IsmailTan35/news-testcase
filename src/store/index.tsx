import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userReducer as user } from "./user";

const reducer = combineReducers({
  user,
});

export default configureStore({
  reducer,
});
