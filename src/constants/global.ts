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
} from '@ant-design/icons'
import Images from './images'

export const CONTENT_COMPONENT = {
    navbarCustom: {
        logo: {
            imgLogo: Images.LOGO,
            altImg: 'Logo',
            icon: MenuFoldOutlined,
        },

        navigate: [
            { key: 1, icon: HomeOutlined, text: 'Home', path: '/home' },
            { key: 2, icon: CheckCircleOutlined, text: 'My task', path: '/my-task' },
            { key: 3, icon: BellOutlined, text: 'Inbox', path: '/inbox' },
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
export const CONTENT_PROJECT = {}
