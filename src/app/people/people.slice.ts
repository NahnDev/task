import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { UserType } from '../../types/user.type';

export type PeopleSlice = {
    [key: UserType['_id']]: UserType;
};

export const peopleSlice = createSlice<PeopleSlice, SliceCaseReducers<PeopleSlice>>({
    initialState: {},
    name: 'people',
    reducers: {
        add(state, action: PayloadAction<UserType>) {
            const people = { ...state };
            const user = action.payload;
            const { _id } = user;
            people[_id] = user;
            return { ...people };
        },
        clear() {
            return {};
        },
    },
});
