import { Row } from 'antd'
import React from 'react'

type Inbox = {
    className: string
}

function Inbox(props: Inbox) {
    return (
        <Row className={props.className}>
            <div>Inbox</div>
        </Row>
    )
}

export default Inbox
