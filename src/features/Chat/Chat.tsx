import { Col, Row } from 'antd'
import React, { CSSProperties } from 'react'
import { colors, containerStyle } from './chat-styles'
import Room from './Room'
import RoomList from './RoomList'
import { rooms } from './seed'

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
}

export default function Chat() {
    return (
        <div className="Chat" style={styles.root}>
            <RoomList style={styles.col}></RoomList>
            <Room info={rooms['1']} style={styles.col}></Room>
        </div>
    )
}
