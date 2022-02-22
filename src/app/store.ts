import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import projectsReducer from './projectsSlice'

const rootReducer = {
    user: userReducer,
    projects: projectsReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store
