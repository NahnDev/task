import { Button, PageHeader } from 'antd'
import React, { CSSProperties } from 'react'
import { borderStyles, colors, containerStyle } from './chat-styles'
import { DashOutlined } from '@ant-design/icons'
import { IRoom } from '../../interfaces/room.interface'
import MessageList from './message/MessageList'
import MessageSender from './MessageSender'

const styles: {
    root: CSSProperties
    row: CSSProperties
    line: CSSProperties
    header: CSSProperties
    menuIcon: CSSProperties
} = {
    root: {
        background: colors.primary,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
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
}
export default function Room(prop: { info: IRoom; className?: string; style?: CSSProperties }) {
    return (
        <div className={['Room', prop.className].join(' ')} style={prop.style}>
            <div style={styles.root}>
                <div style={styles.row}>
                    <PageHeader
                        title={<h3 style={styles.header}>{prop.info.name}</h3>}
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
                    <MessageList></MessageList>
                </div>
                <div style={styles.line}></div>
                <div style={styles.row}>
                    <MessageSender></MessageSender>
                </div>
            </div>
        </div>
    )
}
