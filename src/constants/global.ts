import {
    MenuFoldOutlined,
    HomeOutlined,
    CheckCircleOutlined,
    BellOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    PlusCircleOutlined,
    FolderOpenOutlined,
    HourglassOutlined,
    CloseCircleOutlined,
    MoreOutlined,
    UserAddOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    UsergroupAddOutlined,
    ClockCircleOutlined,
    FieldTimeOutlined,
    CheckOutlined,
    CloseOutlined,
    SettingOutlined,
    LogoutOutlined,
    UserSwitchOutlined,
} from '@ant-design/icons'
import Images from './images'

export const listColorRandom = [
    { key: 0, value: '#29339B' },
    { key: 1, value: '#7776BC' },
    { key: 2, value: '#CDC7E5' },
    { key: 3, value: '#FFEC51' },
    { key: 4, value: '#FFEC51' },
    { key: 5, value: '#f56a00' },
    { key: 6, value: '#9BBEC7' },
    { key: 7, value: '#49516F' },
    { key: 8, value: '#A44200' },
    { key: 9, value: '#324376' },
]

export const CONTENT_COMPONENT = {
    navbarCustom: {
        logo: {
            imgLogo: Images.LOGO,
            altImg: 'Logo',
            icon: MenuFoldOutlined,
        },

        navigate: [
            { key: 1, icon: HomeOutlined, text: 'Home', path: '/home' },
            { key: 2, icon: BellOutlined, text: 'Inbox', path: '/inbox' },
        ],

        projectDetail: {
            textBtn: 'Invite',
            iconBtn: PlusOutlined,
        },

        help: {
            icon: QuestionCircleOutlined,
            text: 'Help & Report',
        },
    },

    header: {
        menuDropdown: [
            { key: 'add-task', text: 'Add Task', icon: PlusCircleOutlined },
            { key: 'add-member', text: 'Add Member', icon: UserAddOutlined },
            { key: 'add-roles', text: 'Add Roles', icon: UsergroupAddOutlined },
            { key: 'set-role', text: 'Set Role', icon: UserSwitchOutlined },
            { key: 'delete-project', text: 'Delete Project', icon: DeleteOutlined },
        ],

        menuUser: [
            { key: 'profile', text: 'Setting Profile', icon: SettingOutlined },
            { key: 'logout', text: 'Logout', icon: LogoutOutlined },
        ],
    },
}

export const CONTENT_AUTH = {
    formSignUp: {
        title: 'Register',
        textDesc: 'You have an account?',
        textLink: 'Sign in',
        pathLink: '/auth/login',
        textBtn: 'SIGN UP',
    },
    formSignIn: {
        title: 'Login',
        textDesc: "Don't have an account?",
        textLink: 'Sign up',
        pathLink: '/auth/register',
        textBtn: 'SIGN IN',
    },
}

export const CONTENT_HOME = {
    title: 'Home',
    descriptionContent: {
        textDesc: 'Have a beautiful day!',
        textTask: 'tasks',
        iconTask: CheckCircleOutlined,
        textProjects: 'project',
        iconProject: FolderOpenOutlined,
    },

    priorities: {
        title: 'My Priorities',
        iconAddTask: PlusCircleOutlined,
        textAddTask: 'Click here to add task...',
        navigate: [
            { value: 'doing', text: 'Doing' },
            { value: 'overdue', text: 'Overdue' },
            { value: 'completed', text: 'Completed' },
        ],

        iconStatus: [
            { value: 'doing', icon: HourglassOutlined },
            { value: 'completed', icon: CheckCircleOutlined },
            { value: 'overdue', icon: CloseCircleOutlined },
        ],
    },

    projects: {
        title: 'Projects',
        iconAddProject: PlusOutlined,
        textAddProject: 'Create project',

        project: {
            icon: MoreOutlined,
        },
    },

    formProject: {
        title: 'Create project',
        btnSubmit: 'Continue',

        fieldsName: {
            name: 'name',
            label: 'Name Project *',
            type: 'text',
        },
    },
}
export const CONTENT_INBOX = {
    title: 'Inbox',
    navigate: [
        { path: 'messages', text: 'Messages' },
        { path: 'notification', text: 'Notification' },
    ],
}
export const CONTENT_PROJECT = {
    title: 'Project',

    formTask: {
        title: 'Add Task',
        btnSubmit: 'Add task',

        fieldsName: {
            name: 'name',
            label: 'Name Task *',
            type: 'text',
        },

        fieldsExpires: {
            name: 'expires',
            label: 'Deadline',
        },

        fieldsUser: {
            name: 'assignee',
            label: 'Assignee',
        },
    },

    formSubTask: {
        btnSubmit: 'Add subtask',

        fieldsName: {
            name: 'name',
            label: 'Name Subtask *',
            type: 'text',
        },

        fieldsExpires: {
            name: 'expires',
            label: 'Deadline',
        },
    },

    formMember: {
        title: 'Manager Member',
        btnSubmit: PlusOutlined,
        btnDelete: DeleteOutlined,

        fieldsName: {
            name: 'member',
            label: 'Name Member *',
            type: 'text',
        },
    },

    formRoles: {
        title: 'Add Role',
        btnSubmit: 'Add Role',
        iconDeleteRole: DeleteOutlined,

        fieldsName: {
            name: 'member',
            label: 'Name Member *',
            type: 'text',
        },

        optionsPermission: [
            { _id: 'UPDATE', name: 'Update' },
            { _id: 'DELETE', name: 'Delete' },
            { _id: 'TASK_MANAGE', name: 'Task Manage' },
            { _id: 'ROLE_MANAGE', name: 'Role Manage' },
            { _id: 'MEMBER_MANAGE', name: 'Member Manage' },
            { _id: 'MESSAGE_VIEW', name: 'Message View' },
            { _id: 'MESSAGE_SEND', name: 'Message Send' },
            { _id: 'FILE_MANAGE', name: 'File Manage' },
        ],
    },

    formSetRole: {
        title: 'Add Role',
        btnSubmit: 'Add Role',
        iconDeleteRole: DeleteOutlined,

        fieldsName: {
            name: 'member',
            label: 'Name Member *',
            type: 'text',
        },

        optionsPermission: [
            { _id: 'UPDATE', name: 'Update' },
            { _id: 'DELETE', name: 'Delete' },
            { _id: 'TASK_MANAGE', name: 'Task Manage' },
            { _id: 'ROLE_MANAGE', name: 'Role Manage' },
            { _id: 'MEMBER_MANAGE', name: 'Member Manage' },
            { _id: 'MESSAGE_VIEW', name: 'Message View' },
            { _id: 'MESSAGE_SEND', name: 'Message Send' },
            { _id: 'FILE_MANAGE', name: 'File Manage' },
        ],
    },
    tasks: {
        iconBtnAdd: PlusOutlined,
        textBtnAdd: 'Add new task',
        iconMenuTask: EllipsisOutlined,
        iconDeleteTask: DeleteOutlined,
        iconDeadline: FieldTimeOutlined,

        filter: [
            { value: 'TODO', title: 'To do', icon: ClockCircleOutlined },
            { value: 'DOING', title: 'Doing', icon: HourglassOutlined },
            { value: 'DONE', title: 'Done', icon: CheckCircleOutlined },
        ],

        subtask: {
            title: 'Subtasks',
            btnAdd: '+ Add subtask',
            iconCheck: CheckOutlined,
            iconCancel: CloseOutlined,
        },
    },
}
