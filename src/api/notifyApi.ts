import { NotifyType } from '../types/notify.type';
import axiosClient from './axiosClient';

const notifyApi = {
    getNotify: (): Promise<NotifyType[]> => {
        const url = `/notifies`;
        return axiosClient.get(url);
    },

    getNotifyById: (_id: string): Promise<NotifyType> => {
        const url = `/notifies/${_id}`;
        return axiosClient.get(url);
    },
};
export default notifyApi;
