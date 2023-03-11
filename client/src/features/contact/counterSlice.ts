import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 42,
  title: "YARC ( yet to another redux counter",
};

export const counterSlice = (amount = 1) => {
  return createSlice({
    name: "counter",
    initialState,
    reducers: {
      increment: (state, action) => {
        state.data = state.data + action.payload;
      },
      decrement: (state, action) => {
        state.data = state.data - action.payload;
      },
    },
  });
};

export const { increment, decrement } = counterSlice().actions;
