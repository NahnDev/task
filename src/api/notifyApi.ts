import axiosClient from './axiosClient'

const notifyApi = {
    getNotify: () => {
        const url = `/notify`
        return axiosClient.get(url)
    },

    getNotifyById: (_id: string) => {
        const url = `/notify/${_id}`
        return axiosClient.get(url)
    },
}
export default notifyApi
