import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { messageReducer } from './message/message.reducer';
import { roomReducer } from './room/room.reducer';
import userReducer from './userSlice';

const rootReducer = {
    user: userReducer,
    message: messageReducer,
    room: roomReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
