import React, { CSSProperties } from 'react'
import UserAvatar from '../../../components/UserAvatar/UserAvatar'
import { IMessage } from '../../../interfaces/message.interface'
import { borderStyles, colors } from '../chat-styles'
import TextMessage from './TextMessage'

function makeStyles(me: boolean): { [key: string]: CSSProperties } {
    return {
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            direction: me ? 'rtl' : 'ltr',
        },
        avatar: {
            ...borderStyles,
            margin: '0.5em',
        },
        message: {
            background: me ? colors.highlight : colors.secondary,

            padding: '0.5em 1em',
            borderRadius: '50vh',
            color: colors.text,
        },
    }
}

export default function Message(prop: { message: IMessage }) {
    const me: boolean = Math.random() * 2 > 1 ? true : false
    const styles = makeStyles(me)
    return (
        <div className="Message" style={styles.root}>
            <UserAvatar userId={prop.message.from} size="tiny" style={styles.avatar}></UserAvatar>
            <div style={styles.message}>
                <TextMessage text={prop.message.content.text + ''}></TextMessage>
            </div>
        </div>
    )
}
