import { Row } from 'antd'
import React from 'react'

type Project = {
    className: string
}

function Project(props: Project) {
    return (
        <Row className={props.className}>
            <div>Project</div>
        </Row>
    )
}

export default Project
