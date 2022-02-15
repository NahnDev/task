import React, { CSSProperties } from 'react';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import { MessageType } from '../../../types/message.type';
import { borderStyles, colors } from '../../../styles/chat.style';
import TextMessage from './TextMessage';

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
    };
}

export default function Message(prop: { message: MessageType }) {
    const me: boolean = Math.random() * 2 > 1 ? true : false;
    const styles = makeStyles(me);
    return (
        <div className="Message" style={styles.root}>
            <UserAvatar userId={prop.message.from} size="tiny" style={styles.avatar}></UserAvatar>
            <div style={styles.message}>
                <TextMessage text={prop.message.content.data + ''}></TextMessage>
            </div>
        </div>
    );
}
