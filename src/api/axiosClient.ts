import axios from 'axios'
import queryString from 'query-string'

const refreshToken = async (token: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                axios.get(
                    `${process.env.REACT_APP_API_URL}auth/access-tokens?refreshToken=${token.refreshToken}`
                )
            )
        }, 3000)
    })
}

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

    const token: any = JSON.parse(localStorageToken) || null

    const isExpired = token && Date.now() > token.expires ? true : false
    let refreshTokenRequest = null

    if (isExpired) {
        refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : refreshToken(token)

        const response: any = await refreshTokenRequest
        const newToken = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            expires: response.data.expires,
        }

        localStorage.setItem('token', JSON.stringify(newToken))
        localStorage.setItem('_id', response.data.user._id)

        refreshTokenRequest = null
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token.accessToken}`
    }

    return config
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
