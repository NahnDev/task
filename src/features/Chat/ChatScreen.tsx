import { Col, Row } from 'antd';
import React, { CSSProperties } from 'react';
import { colors, containerStyle } from '../../styles/chat.style';
import RoomScreen from './room/RoomScreen';
import RoomList from './room/RoomList';
import { rooms } from './seed';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { RoomAction } from '../../app/room/room.action';

const styles: { root: CSSProperties; col: CSSProperties } = {
    root: {
        background: colors.background,
        color: 'white',
        fontWeight: 'bolder',
        width: '100%',
        height: '100%',
        ...containerStyle,

        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
    },
    col: {
        padding: '2em',
    },
};

export default function ChatScreen() {
    const dispatch = useDispatch();
    dispatch(RoomAction.load());
    return (
        <div className="Chat" style={styles.root}>
            <RoomList style={styles.col}></RoomList>
            <RoomScreen info={rooms['1']} style={styles.col}></RoomScreen>
        </div>
    );
}
