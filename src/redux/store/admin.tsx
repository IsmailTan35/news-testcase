import { createSlice, current } from "@reduxjs/toolkit";

interface IAdminState {
  id: string | null;
  fullname: string | null;
  email: string | null;
  token: string | null;
}

let initialState: IAdminState = {
  id: null,
  fullname: null,
  email: null,
  token: null,
};

const { reducer, actions } = createSlice({
  name: "admin",
  initialState: {
    item: initialState,
  },
  reducers: {
    refresh(state, action) {
      state.item = action.payload;
    },
    delete(state) {
      state.item = initialState;
    },
  },
});

export { actions as adminActions };
export { reducer as adminReducer };
