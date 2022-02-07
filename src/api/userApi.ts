import { Form } from '../types/auth'
import axiosClient from './axiosClient'

const userApi = {
    getUser: () => {
        const url = `/user`
        return axiosClient.get(url)
    },

    getUserDetail: (_id: string) => {
        const url = `/user/${_id}`
        return axiosClient.get(url)
    },

    postUser: (data: Form) => {
        const url = '/user'
        return axiosClient.post(url, data)
    },

    patchUser: (_id: string, data: Form) => {
        const url = `/user/${_id}`
        return axiosClient.patch(url, data)
    },

    deleteUser: (_id: string) => {
        const url = `/user/${_id}`
        return axiosClient.delete(url)
    },
}
export default userApi
