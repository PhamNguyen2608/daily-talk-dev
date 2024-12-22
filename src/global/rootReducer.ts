import { createSlice, combineReducers } from '@reduxjs/toolkit';

// Định nghĩa interface cho state
interface TestState {
  value: string;
}

// Tạo initial state
const initialState: TestState = {
  value: 'Hello Redux!'
};

// Tạo slice
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    updateValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Export actions
export const { updateValue } = testSlice.actions;

// Combine tất cả reducers
const rootReducer = combineReducers({
  test: testSlice.reducer,
});

export default rootReducer;