import { text } from 'stream/consumers';
import { string } from 'yup/lib/locale';
import { MessageType } from '../../types/message.type';
import { RoomType } from '../../types/room.type';
import { UserType } from '../../types/user.type';

export const rooms: { [key: string]: RoomType } = {
    '1': {
        _id: '1',
        name: 'Nien luan nganh',
        lastMessage: {
            _id: 'string',
            room: '3',
            content: {
                t: 'text',
                data: 'Toi la Le Thanh Nhan',
            },
            from: '33',
            at: new Date(new Date().setDate(-2)),
        },
    },
};

export const users: { [key: string]: UserType } = {
    '33': {
        _id: '33',
        name: 'Le Thanh Nhan',
    },
};
export const messages: { [key: string]: MessageType } = {};
export const message: { [key: string]: MessageType } = {
    // '1': {
    //     _id: '1',
    //     from: '33',
    //     content: {
    //         t: 'text',
    //         data: 'le thanh nha',
    //     },
    //     at: new Date(),
    // },
    // '2': {
    //     _id: '2',
    //     from: '33',
    //     content: {
    //         t: 'text',
    //         data: 'le thanh nha',
    //     },
    //     at: new Date(),
    // },
    // '3': {
    //     _id: '3',
    //     from: '33',
    //     content: {
    //         t: 'text',
    //         data: 'le thanh nha',
    //     },
    //     at: new Date(),
    // },
    // '4': {
    //     _id: '4',
    //     from: '33',
    //     content: {
    //         t: 'text',
    //         data: 'le thanh nha',
    //     },
    //     at: new Date(),
    // },
    // '5': {
    //     _id: '5',
    //     from: '33',
    //     content: {
    //         t: 'text',
    //         data: 'le thanh nha',
    //     },
    //     at: new Date(),
    // },
    // '6': {
    //     _id: '6',
    //     from: '33',
    //     content: {
    //         t: 'text',
    //         data: 'le thanh nha',
    //     },
    //     at: new Date(),
    // },
    // '7': {
    //     _id: '7',
    //     from: '33',
    //     content: {
    //         t: 'text',
    //         data: 'le thanh nha',
    //     },
    //     at: new Date(),
    // },
    // '8': {
    //     _id: '8',
    //     from: '33',
    //     content: {
    //         t: 'text',
    //         data: 'le thanh nha',
    //     },
    //     at: new Date(),
    // },
    // '9': {
    //     _id: '9',
    //     from: '33',
    //     content: {
    //         t: 'text',
    //         data: 'le thanh nhahafs fsd f sa f sd f s fs fs f s ',
    //     },
    //     at: new Date(),
    // },
    // '10': {
    //     _id: '10',
    //     from: '33',
    //     content: {
    //         t: 'text',
    //         data: 'viet nam dan chu cong hoa',
    //     },
    //     at: new Date(),
    // },
};
