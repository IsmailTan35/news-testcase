import { createSlice, current } from "@reduxjs/toolkit";

interface IAction {
  payload: { name: "id" | "password"; value: any };
}

interface IState {
  id: string | null;
  [key: string]: any;
}

let data: IState = {
  id: null,
};

const { reducer, actions } = createSlice({
  name: "user",

  initialState: data,

  reducers: {
    refresh(state: IState, action: IAction) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    update(state: IState, action: IAction) {
      const { name, value } = action.payload;
      state[name].push(value);
    },
  },
});

export { actions as userActions };
export { reducer as userReducer };
