import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Project } from '../types/global'

const initialState: Array<Project> = []

const projects = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        // Form Phone and password
        list: (state, action: PayloadAction<any>) => {
            state = action.payload

            return state
        },

        add: (state, action: PayloadAction<Project>) => {
            state.push({ ...action.payload, members: [] })

            return state
        },
    },
})

const { reducer, actions } = projects
export const { list, add } = actions
export default reducer
