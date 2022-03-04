import notifyApi from '../../api/notifyApi';
import { NotifyType } from '../../types/notify.type';
import store from '../store';
import { notifySlice } from './notify.slice';

export class NotifyAction {
    static async load() {
        const notifies: NotifyType[] = await notifyApi.getNotify();
        store.dispatch(notifySlice.actions.addMany(notifies));
    }
}
