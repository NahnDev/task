import { Col, Row } from 'antd';
import React, { CSSProperties } from 'react';
import { colors, containerStyle } from '../../styles/chat.style';
import RoomScreen from './room/RoomScreen';
import RoomList from './room/RoomList';
import { rooms } from './seed';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { RoomAction } from '../../app/room/room.action';
import { useParams } from 'react-router-dom';

const styles: { root: CSSProperties; col: CSSProperties } = {
    root: {
        background: colors.background,
        color: 'white',
        fontWeight: 'bolder',
        width: '100%',
        ...containerStyle,

        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
    },
    col: {
        padding: '2em',
        ...containerStyle,
    },
};

export default function ChatScreen() {
    const dispatch = useDispatch();
    dispatch(RoomAction.load());
    const params = useParams();
    return (
        <div className="Chat" style={styles.root}>
            <RoomList focus={params['rId']} style={styles.col}></RoomList>
            {params['rId'] ? (
                <RoomScreen rId={params['rId']} style={styles.col}></RoomScreen>
            ) : (
                <div></div>
            )}
        </div>
    );
}
