import axios from 'axios';
import queryString from 'query-string';
import { Token } from '../types/global';

// const refreshToken = async (token: any) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(
//                 axios.get(
//                     `${process.env.REACT_APP_API_URL}auth/access-tokens?refreshToken=${token.refreshToken}`
//                 )
//             );
//         }, 3000);
//     });
// };

let refreshing = false;
async function refreshToken(refreshToken: string) {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}auth/access-tokens`, {
        params: { refreshToken },
    });
    const newToken = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        expires: response.data.expires,
    };
    refreshing = false;
    localStorage.setItem('token', JSON.stringify(newToken));
    localStorage.setItem('_id', response.data.user._id);
}

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
    const localStorageToken: any = localStorage.getItem('token');

    const token = JSON.parse(localStorageToken) as Token;
    const isExpired = token && (Date.now() - 5000 > token.expires ? true : false);
    if (isExpired && !refreshing) {
        refreshing = true;
        refreshToken(token.refreshToken).then();
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;
