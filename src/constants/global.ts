import {
    MenuFoldOutlined,
    HomeOutlined,
    CheckCircleOutlined,
    BellOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
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
