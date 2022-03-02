import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Member, Project } from '../types/global'

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

        addMember: (state, action: PayloadAction<Member>) => {
            state.members.push(action.payload)
            return state
        },
    },
})

const { reducer, actions } = project
export const { add, addMember } = actions

export default reducer
