import { createSlice, current } from "@reduxjs/toolkit";

interface IAction {
  payload: { name: "id" | "password"; value: any };
}

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
    refresh(state: IState, action: IAction) {
      const { name, value } = action.payload;
      state.items = value;
    },
    update(state: IState, action: IAction) {
      const { name, value } = action.payload;
      state.items.push(value);
    },
  },
});

export { actions as newsActions };
export { reducer as newsReducer };
