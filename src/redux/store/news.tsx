import { createSlice, current } from "@reduxjs/toolkit";

interface IState {
  items: object[];
}

let data: IState = {
  items: [],
};

const { reducer, actions } = createSlice({
  name: "news",
  initialState: data,
  reducers: {
    refresh(state, action) {
      state.items = action.payload;
    },
    update(state, action) {
      state.items.push(action.payload);
    },
  },
});

export { actions as newsActions };
export { reducer as newsReducer };
