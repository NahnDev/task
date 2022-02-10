import { List } from 'antd'
import React, { CSSProperties } from 'react'
import { IRoom } from '../../interfaces/room.interface'
import RoomThumbnail from './RoomThumbnail'
import { rooms } from './seed'

const roomArr = Object.keys(rooms).map((key) => rooms[key])
export default function RoomList(prop: { className?: string; style?: CSSProperties }) {
    return (
        <List
            className={[prop.className].join(' ')}
            style={prop.style}
            dataSource={roomArr}
            renderItem={(item, index) => <RoomThumbnail key={item._id} info={item}></RoomThumbnail>}
        ></List>
    )
}
