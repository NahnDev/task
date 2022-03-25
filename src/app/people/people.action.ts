import userApi from '../../api/userApi';
import { User } from '../../types/global';
import { UserType } from '../../types/user.type';
import { AppDispatch } from '../store';
import { peopleSlice } from './people.slice';

export class PeopleAction {
    static getOne(_id: string) {
        return async (dispatch: AppDispatch) => {
            dispatch(peopleSlice.actions.add({ _id, name: "" }));
            const user = await userApi.getUserDetail(_id);
            dispatch(peopleSlice.actions.add(user));
            // const user: UserType = (await userApi.getUserDetail(_id)) as UserType;
        };
    }
}
