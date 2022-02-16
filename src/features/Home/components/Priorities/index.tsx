import { Col, Row } from 'antd'
import { useState } from 'react'
import { CONTENT_HOME } from '../../../../constants/global'
import Task from './Task'

type IProps = {
    className: string
    listTask: Array<any>
}

const content = CONTENT_HOME.priorities

function Priorities(props: IProps) {
    const [filter, setFilter] = useState<string>('doing')

    return (
        <Row className={`${props.className}`}>
            <Col xs={24}>
                <Row align="middle" className={`${props.className}--title`}>
                    <span>{content.title}</span>
                </Row>
                <Row align="middle" className={`${props.className}--navigate`}>
                    {content.navigate &&
                        content.navigate.length &&
                        content.navigate.map((value, index) => {
                            return (
                                <Col
                                    key={`priorities-nav-${index}`}
                                    className={
                                        filter === value.value
                                            ? `${props.className}--navigate-item active`
                                            : `${props.className}--navigate-item`
                                    }
                                    onClick={() => setFilter(value.value)}
                                >
                                    {value.text}
                                </Col>
                            )
                        })}
                </Row>
                <Row className={`${props.className}--tasks`}>
                    <Col xs={24}>
                        <Row align="middle" className={`${props.className}--task`}>
                            <span className={`${props.className}--task-icon`}>
                                <content.iconAddTask />
                            </span>
                            <span className={`${props.className}--task-text`}>
                                {content.textAddTask}
                            </span>
                        </Row>
                        {props.listTask.map((value, index) => {
                            return (
                                <Task
                                    key={`task-${index}`}
                                    className={`${props.className}--task`}
                                    value={value}
                                />
                            )
                        })}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Priorities
