import { Avatar, List } from 'antd'
import React, { CSSProperties } from 'react'
import { borderStyles, colors } from './chat-styles'
import { IRoom } from '../../interfaces/room.interface'
import { users } from './seed'

const styles: {
    root: CSSProperties
    name: CSSProperties
    message: {
        content: CSSProperties
        avatar: CSSProperties
    }
} = {
    root: {
        ...borderStyles,
        background: colors.primary,
        color: colors.text + '!important',
        padding: '0.5em 2em',
    },
    name: {
        fontWeight: 'bolder',
        color: colors.text,
        margin: 0,
    },
    message: {
        avatar: {
            height: '1.5em',
            width: '1.5em',
            ...borderStyles,
            margin: 0,
            padding: 0,
        },
        content: { color: colors.text, margin: 0 },
    },
}

export default function RoomThumbnail(prop: { info: IRoom }) {
    return (
        <List.Item style={styles.root}>
            <List.Item.Meta
                title={<p style={styles.name}>{prop.info.name}</p>}
                description={
                    <List.Item.Meta
                        style={{ color: colors.text }}
                        avatar={
                            <Avatar
                                style={styles.message.avatar}
                                src={users[prop.info.lastMessage.from].avatar}
                            ></Avatar>
                        }
                        title={
                            <p style={styles.message.content}>
                                {' '}
                                {prop.info.lastMessage.content.text || 'Sended a image'}
                            </p>
                        }
                    ></List.Item.Meta>
                }
            ></List.Item.Meta>
        </List.Item>
    )
}
