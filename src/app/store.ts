import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import projectsReducer from './projectsSlice'
import projectReducer from './projectSlice'

const rootReducer = {
    user: userReducer,
    projects: projectsReducer,
    project: projectReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store
