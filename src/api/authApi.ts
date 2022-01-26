import { typeDataLogin, typeDataRegister } from '../constants/type'
import axiosClient from './axiosClient'

const authApi = {
    postAuthLogin: (data: typeDataLogin) => {
        const url = '/auth/login'
        return axiosClient.post(url, data)
    },

    postAuthRegister: (data: typeDataRegister) => {
        const url = '/auth/register'
        return axiosClient.post(url, data)
    },

    getAccessTokens: () => {
        const url = `/auth/access-tokens`
        return axiosClient.get(url)
    },

    getGoogleLogin: () => {
        const url = `/auth/google-login`
        return axiosClient.get(url)
    },

    getActive: () => {
        const url = `/auth/active`
        return axiosClient.get(url)
    },

    getResendActiveEmail: (email: string) => {
        const url = `/auth/resend-active-mail/${email}`
        return axiosClient.get(url)
    },
}
export default authApi
