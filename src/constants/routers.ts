import React from 'react';
import { SignIn, SignUp } from '../features/Auth/pages';
import ChatScreen from '../features/Chat/ChatScreen';
import { Messages, Notification } from '../features/Inbox/pages';

const Home = React.lazy(() => import('../features/Home'));
const Inbox = React.lazy(() => import('../features/Inbox'));
const Project = React.lazy(() => import('../features/Project'));
const Chat = React.lazy(() => import('../features/Chat/ChatScreen'));

export const ROUTER_MAIN = [
    {
        path: 'home',
        component: Home,
        role: ['USER'],
        isLogin: true,
    },
    {
        path: 'inbox/*',
        component: Inbox,
        role: ['USER'],
        isLogin: true,
    },
    {
        path: 'project/:id',
        component: Project,
        role: ['USER'],
        isLogin: true,
    },
    { path: 'chat', component: Chat, role: ['USER'], isLogin: true },
];

export const ROUTER_AUTH = [
    {
        path: 'login',
        component: SignIn,
        isLogin: false,
    },
    {
        path: 'register',
        component: SignUp,
        isLogin: false,
    },
];

export const ROUTER_INBOX = [
    { path: 'messages', component: ChatScreen, isLogin: false },
    {
        path: 'messages/:rId',
        component: ChatScreen,
        isLogin: false,
    },
    {
        path: 'notification',
        component: Notification,
        isLogin: false,
    },
];
