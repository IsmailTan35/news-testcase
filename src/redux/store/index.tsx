import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { adminReducer as admin } from "./admin";
import { newsReducer as news } from "./news";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const reducer = combineReducers({
  admin,
  news,
});
export { adminActions } from "./admin";

const store = configureStore({ reducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
