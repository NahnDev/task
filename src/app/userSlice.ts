import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { typeUser } from '../constants/type'

const isLogin: boolean = localStorage.getItem('token') ? true : false

const initialState: typeUser = {
    isLogin: isLogin,
}

const user = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        // Form Phone and password
        setUser: (state, action: PayloadAction<any>) => {
            state = { ...state, ...action.payload }
            return state
        },
        // setProfile: (state, action) => {
        //     state = { ...state, profile: action.payload }
        //     return state
        // },
        // setData: (state, action) => {
        //     state = { ...state, data: action.payload }
        //     const user = {
        //         isLogin: action.payload.isLogin,
        //         phone: action.payload.phone,
        //         _id: action.payload.accountId,
        //     }
        //     if (action.payload.isLogin) {
        //         localStorage.setItem('token', JSON.stringify(action.payload.token))
        //         localStorage.setItem('user', JSON.stringify(user))
        //     }
        //     return state
        // },
        // setSignOut: (state, action) => {
        //     state = { data: action.payload }
        //     localStorage.setItem('user', JSON.stringify(state))
        //     localStorage.removeItem(`token`)
        //     return state
        // },
    },
})

const { reducer, actions } = user
export const { setUser } = actions
export default reducer
