import { IMessage } from './message.interface'

export interface IRoom {
    _id: string
    name: string
    lastMessage: IMessage
}
