import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Project } from '../types/global'

const initialState: Project = {
    _id: '',
    name: '',
    author: '',
    members: [],
}

const project = createSlice({
    name: 'project',
    initialState: initialState,
    reducers: {
        add: (state, action: PayloadAction<Project>) => {
            state = action.payload
            return state
        },
    },
})

const { reducer, actions } = project
export const { add } = actions

export default reducer
