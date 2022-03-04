import { Avatar, List } from 'antd';
import React, { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { borderStyles, colors } from '../../../styles/chat.style';
import { RoomType } from '../../../types/room.type';
import { users } from '../seed';

function useStyles(props: { active?: boolean }): {
    root: CSSProperties;
    name: CSSProperties;
    message: {
        content: CSSProperties;
        avatar: CSSProperties;
    };
} {
    return {
        root: {
            ...borderStyles,
            background: props.active ? colors.highlight : colors.primary,
            color: colors.text + '!important',
            padding: '0.5em 2em',
        },
        name: {
            fontWeight: 'bolder',
            color: colors.text,
            fontSize: '1.3em',
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
    };
}

export default function RoomThumbnail(props: {
    info: RoomType;
    active?: boolean;
    style?: CSSProperties;
}) {
    const styles = useStyles(props);
    const params = useParams();
    return (
        <Link to={`/inbox/messages/${props.info._id}`}>
            <List.Item style={{ ...styles.root, ...props.style }}>
                <List.Item.Meta
                    title={<p style={styles.name}>{props.info.name}</p>}
                    description={
                        props.info.lastMessage ? (
                            <List.Item.Meta
                                style={{ color: colors.text }}
                                // avatar={
                                //     <Avatar
                                //         style={styles.message.avatar}
                                //         src={users[props.info.lastMessage.from]?.avatar}
                                //     ></Avatar>
                                // }
                                title={
                                    <p style={styles.message.content}>
                                        {' '}
                                        {props.info.lastMessage.content.data || 'Sended a image'}
                                    </p>
                                }
                            ></List.Item.Meta>
                        ) : (
                            <div> &#160;</div>
                        )
                    }
                ></List.Item.Meta>
            </List.Item>
        </Link>
    );
}
