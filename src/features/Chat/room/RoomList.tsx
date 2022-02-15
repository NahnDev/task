import { List } from 'antd';
import React, { CSSProperties } from 'react';
import RoomThumbnail from './RoomThumbnail';
import { rooms } from '../seed';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { roomSlice, RoomSlice } from '../../../app/room/room.slice';

export default function RoomList(prop: { className?: string; style?: CSSProperties }) {
    const rooms = useSelector<RootState, RoomSlice>((state) => state.room);
    return (
        <List
            className={[prop.className].join(' ')}
            style={prop.style}
            dataSource={Object.keys(rooms).map((id) => rooms[id])}
            renderItem={(item) => <RoomThumbnail key={item._id} info={item}></RoomThumbnail>}
        ></List>
    );
}
