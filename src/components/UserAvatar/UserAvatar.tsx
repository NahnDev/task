import { Avatar } from 'antd'
import React, { CSSProperties } from 'react'
import { users } from '../../features/Chat/seed'

const styles: { size: { small: CSSProperties; tiny: CSSProperties } } = {
    size: {
        small: {
            width: '3em',
            height: '3em',
        },
        tiny: {
            width: '1.5em',
            height: '1.5em',
        },
    },
}

export default function UserAvatar(prop: {
    userId: string
    size: 'small' | 'tiny'
    className?: string
    style?: CSSProperties
}) {
    const src = users[prop.userId].avatar
    return (
        <Avatar
            className={[prop.className].join(' ')}
            src={src}
            style={{ ...styles.size[prop.size], ...prop.style }}
        ></Avatar>
    )
}
