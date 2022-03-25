import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import projectsReducer from './projectsSlice';
import projectReducer from './projectSlice';
import thunk from 'redux-thunk';
import { messageReducer } from './message/message.reducer';
import { notifyReducer } from './notify/notify.reducer';
import { roomReducer } from './room/room.reducer';
import { authReducer } from './auth/auth.reducer';
import peopleReducer from './people/people.reducer';

const rootReducer = {
    user: userReducer,
    message: messageReducer,
    room: roomReducer,
    notify: notifyReducer,
    projects: projectsReducer,
    project: projectReducer,
    auth: authReducer,
    people: peopleReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
