import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Member, Project } from '../types/global'

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

        addMemberToProject: (state, action: PayloadAction<{ _pid: any; value: Member }>) => {
            state.map((value, index) => {
                if (value._id === action.payload._pid) {
                    state[index].members.push(action.payload.value)
                }
            })

            return state
        },
        deleteMemberToProject: (state, action: PayloadAction<{ _pid: any; value: string }>) => {
            state.map((value, index) => {
                if (value._id === action.payload._pid) {
                    state[index].members = state[index].members.filter(
                        (item) => item.user._id !== action.payload.value
                    )
                }
            })

            return state
        },
    },
})

const { reducer, actions } = projects
export const { list, add, addMemberToProject, deleteMemberToProject } = actions
export default reducer
