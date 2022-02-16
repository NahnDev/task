import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    paramsSerializer: (params) => queryString.stringify(params),
})
axiosClient.interceptors.request.use(async (config: any) => {
    const localStorageToken: any = localStorage.getItem('token')

    const token: any = JSON.parse(localStorageToken) || ''

    const isExpired = Date.now() > token.expires ? true : false

    if (token.accessToken) {
        config.headers.Authorization = `Bearer ${token.accessToken}`
    }

    if (!isExpired) {
        return config
    } else {
        // Token Expired
        if (token) {
            const response: any = await axios.get(
                `${process.env.REACT_APP_API_URL}auth/access-tokens`,
                {
                    headers: {
                        Authorization: `Bearer ${token.refreshToken}`,
                    },
                }
            )
            const tokenResponse = {
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                expires: response.expires,
            }

            localStorage.setItem('token', JSON.stringify(tokenResponse))
            config.headers.Authorization = `Bearer ${response.accessToken}`
        }
        return config
    }
})

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data
        }

        return response
    },
    (error) => {
        throw error
    }
)

export default axiosClient
