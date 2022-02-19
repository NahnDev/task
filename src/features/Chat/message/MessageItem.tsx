import React, { CSSProperties } from 'react';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import { MessageType } from '../../../types/message.type';
import { borderStyles, colors } from '../../../styles/chat.style';
import TextMessage from './TextMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { UserType } from '../../../types/user.type';

function makeStyles(me: boolean): { [key: string]: CSSProperties } {
    return {
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            direction: me ? 'rtl' : 'ltr',
        },
        name: {
            textAlign: me ? 'right' : 'left',
            color: colors.text,
            padding: '0 0.5em',
        },
        avatar: {
            ...borderStyles,
            margin: '0.2',
        },
        message: {
            background: me ? colors.highlight : colors.secondary,

            padding: '0.5em 1em',
            borderRadius: '50vh',
            color: colors.text,
        },
    };
}

export default function MessageItem(prop: { message: MessageType }) {
    const user = useSelector<RootState, UserType>((state) => state.user);
    const me = prop.message.from === user._id;
    const styles = makeStyles(me);
    return (
        <div className="Message" style={styles.root}>
            <UserAvatar userId={prop.message.from} size="tiny" style={styles.avatar}></UserAvatar>
            <div>
                <h5 style={styles.name}>{user.name}</h5>
                <div style={styles.message}>
                    <TextMessage text={prop.message.content.data + ''}></TextMessage>
                </div>
            </div>
        </div>
    );
}
