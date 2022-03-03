<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import projectsReducer from './projectsSlice'
import projectReducer from './projectSlice'

const rootReducer = {
    user: userReducer,
    projects: projectsReducer,
    project: projectReducer,
}
=======
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { messageReducer } from './message/message.reducer';
import { notifyReducer } from './notify/notify.reducer';
import { roomReducer } from './room/room.reducer';
import userReducer from './userSlice';

const rootReducer = {
    user: userReducer,
    message: messageReducer,
    room: roomReducer,
    notify: notifyReducer,
};
>>>>>>> d6da8f846b0ee57336390e4d0c331a69f2083c50

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
