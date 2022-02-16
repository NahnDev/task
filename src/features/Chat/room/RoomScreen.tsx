import { Button, PageHeader } from 'antd';
import React, { CSSProperties } from 'react';
import { borderStyles, colors, containerStyle } from '../../../styles/chat.style';
import { DashOutlined } from '@ant-design/icons';
import { RoomType } from '../../../types/room.type';
import MessageList from '../message/MessageList';
import MessageSender from '../message/MessageSender';
import { info } from 'console';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const styles: {
    root: CSSProperties;
    row: CSSProperties;
    line: CSSProperties;
    header: CSSProperties;
    menuIcon: CSSProperties;
} = {
    root: {
        background: colors.primary,
        width: '100%',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr auto auto',
        ...borderStyles,
        ...containerStyle,
    },
    row: {
        borderRadius: 0,
        margin: '0em',
    },
    header: {
        color: colors.text,
        margin: 0,
        fontWeight: '3em',
    },
    menuIcon: {
        color: colors.text,
    },
    line: {
        height: '0px',
        width: '100%',
        ...borderStyles,
    },
};
export default function RoomScreen(props: {
    rId: string;
    className?: string;
    style?: CSSProperties;
}) {
    const room = useSelector<RootState, RoomType>((state) => state.room[props.rId]);
    if (!room) return <div></div>;
    return (
        <div className={['Room', props.className].join(' ')} style={props.style}>
            <div style={styles.root}>
                <div style={styles.row}>
                    <PageHeader
                        title={<h3 style={styles.header}>{room.name}</h3>}
                        extra={[
                            <Button
                                key={'menu-room'}
                                style={styles.menuIcon}
                                icon={<DashOutlined />}
                                type="text"
                            ></Button>,
                        ]}
                    ></PageHeader>
                </div>
                <div style={styles.line}></div>
                <div style={{ ...styles.row, ...containerStyle }}>
                    <MessageList rId={room._id}></MessageList>
                </div>
                <div style={styles.line}></div>
                <div style={styles.row}>
                    <MessageSender rId={props.rId}></MessageSender>
                </div>
            </div>
        </div>
    );
}
