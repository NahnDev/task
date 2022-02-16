import { List } from 'antd';
import React, { CSSProperties } from 'react';
import RoomThumbnail from './RoomThumbnail';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { roomSlice, RoomSlice } from '../../../app/room/room.slice';

export default function RoomList(prop: {
    className?: string;
    style?: CSSProperties;
    focus?: string;
}) {
    const rooms = useSelector<RootState, RoomSlice>((state) => state.room);
    return (
        <List
            className={[prop.className].join(' ')}
            style={prop.style}
            dataSource={Object.keys(rooms).map((id) => rooms[id])}
            renderItem={(item) => (
                <RoomThumbnail
                    active={prop.focus === item._id}
                    key={item._id}
                    info={item}
                    style={{ margin: '5px' }}
                ></RoomThumbnail>
            )}
        ></List>
    );
}
