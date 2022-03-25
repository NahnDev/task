import React, { CSSProperties } from 'react';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import { MessageType } from '../../../types/message.type';
import { borderStyles, colors } from '../../../styles/chat.style';
import TextMessage from './TextMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { UserType } from '../../../types/user.type';
import { PeopleAction } from '../../../app/people/people.action';

function makeStyles(me: boolean): { [key: string]: CSSProperties } {
    return {
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            direction: me ? 'rtl' : 'ltr',
            marginRight: me ? 'auto' : '4em',
            marginLeft: me ? '4em' : 'auto',
        },
        name: {
            textAlign: me ? 'right' : 'left',
            color: colors.text,
            padding: '0 0.5em',
        },
        avatar: {
            ...borderStyles,
            margin: '0.2',
            minWidth: 'max-content',
        },
        message: {
            background: me ? colors.highlight : colors.secondary,

            padding: '0.5em 1em',
            borderRadius: '50vh',
            color: colors.text,
        },
    };
}

export default function MessageItem(props: { message: MessageType }) {
    const _id = props.message.from;
    const dispatch = useDispatch();
    const user = useSelector<RootState, UserType>((state) => state.user);
    let sender = useSelector<RootState, UserType>((state) => state.people[props.message.from]);
    if (!sender) {
        dispatch(PeopleAction.getOne(_id));
        sender = { _id, name: '' };
    }
    const me = user._id === sender._id;
    const styles = makeStyles(me);
    return (
        <div className="Message" style={styles.root}>
            <div>
                <UserAvatar
                    userId={props.message.from}
                    size="tiny"
                    style={styles.avatar}
                ></UserAvatar>
            </div>
            <div>
                <h5 style={styles.name}>{sender.name}</h5>
                <div style={styles.message}>
                    <TextMessage text={props.message.content.data + ''}></TextMessage>
                </div>
            </div>
        </div>
    );
}
