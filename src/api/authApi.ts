import { Form, ResSignUp } from '../types/auth';
import { Token } from '../types/global';
import axiosClient from './axiosClient';

const authApi = {
    postAuthLogin: (data: Form) => {
        const url = '/auth/login';
        return axiosClient.post(url, data);
    },

    postAuthRegister: (data: Form) => {
        const url = '/auth/register';
        return axiosClient.post(url, data);
    },

    getAccessTokens: () => {
        const url = `/auth/access-tokens`;
        return axiosClient.get<any, Token>(url);
    },

    getGoogleLogin: (query: string) => {
        const url = `/auth/google-login` + query;
        return axiosClient.get(url);
    },

    getActive: () => {
        const url = `/auth/active`;
        return axiosClient.get(url);
    },

    getResendActiveEmail: (email: string) => {
        const url = `/auth/resend-active-mail/${email}`;
        return axiosClient.get(url);
    },
};
export default authApi;
