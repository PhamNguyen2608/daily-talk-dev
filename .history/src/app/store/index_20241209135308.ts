import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// Tạo saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer, // Reducer chính
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Thay thunk bằng saga
  devTools: process.env.NODE_ENV !== 'production', // Kích hoạt Redux DevTools trong môi trường dev
});

sagaMiddleware.run(rootSaga); // Chạy rootSaga

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
