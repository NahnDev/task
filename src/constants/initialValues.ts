import moment from 'moment';

export const initialValuesFormSignIn = {
    email: '',
    password: '',
};

export const initialValuesFormSignUp = {
    name: '',
    email: '',
    password: '',
};

export const initialValuesFormHomeProject = {
    name: '',
};

export const initialValuesFormProjectAddTask = {
    name: '',
    expires: moment(),
    assignee: [],
};

export const initialValuesFormProjectAddSubTask = {
    name: '',
};

export const initialValuesFormProjectMember = {
    member: '',
};
