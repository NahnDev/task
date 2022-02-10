import { text } from 'stream/consumers'
import { string } from 'yup/lib/locale'
import { IMessage } from '../../interfaces/message.interface'
import { IRoom } from '../../interfaces/room.interface'
import { IUser } from '../../interfaces/user.interface'

export const rooms: { [key: string]: IRoom } = {
    '1': {
        _id: '1',
        name: 'Nien luan nganh',
        lastMessage: {
            _id: '3',
            content: {
                type: 'text',
                text: 'Toi la Le Thanh Nhan',
            },
            from: '33',
            at: new Date(new Date().setDate(-2)),
        },
    },
}

export const users: { [key: string]: IUser } = {
    '33': {
        _id: '33',
        avatar: 'https://cdn.pixabay.com/photo/2021/10/13/11/29/girl-6706267_960_720.jpg',
        name: 'Le Thanh Nhan',
    },
}
export const messages: { [key: string]: IMessage } = {}
export const message: { [key: string]: IMessage } = {
    '1': {
        _id: '1',
        from: '33',
        content: {
            type: 'text',
            text: 'le thanh nha',
        },
        at: new Date(),
    },
    '2': {
        _id: '2',
        from: '33',
        content: {
            type: 'text',
            text: 'le thanh nha',
        },
        at: new Date(),
    },
    '3': {
        _id: '3',
        from: '33',
        content: {
            type: 'text',
            text: 'le thanh nha',
        },
        at: new Date(),
    },
    '4': {
        _id: '4',
        from: '33',
        content: {
            type: 'text',
            text: 'le thanh nha',
        },
        at: new Date(),
    },
    '5': {
        _id: '5',
        from: '33',
        content: {
            type: 'text',
            text: 'le thanh nha',
        },
        at: new Date(),
    },
    '6': {
        _id: '6',
        from: '33',
        content: {
            type: 'text',
            text: 'le thanh nha',
        },
        at: new Date(),
    },
    '7': {
        _id: '7',
        from: '33',
        content: {
            type: 'text',
            text: 'le thanh nha',
        },
        at: new Date(),
    },
    '8': {
        _id: '8',
        from: '33',
        content: {
            type: 'text',
            text: 'le thanh nha',
        },
        at: new Date(),
    },

    '9': {
        _id: '9',
        from: '33',
        content: {
            type: 'text',
            text: 'le thanh nhahafs fsd f sa f sd f s fs fs f s ',
        },
        at: new Date(),
    },
    '10': {
        _id: '10',
        from: '33',
        content: {
            type: 'text',
            text: 'viet nam dan chu cong hoa',
        },
        at: new Date(),
    },
}
