import { Col, Row } from 'antd'
import moment from 'moment'
import { CONTENT_PROJECT } from '../../../../constants/global'
import { Task } from '../../../../types/global'

type IProps = {
    className: string
    title: string
    actionDropdown: Function
    filter?: string
    icon: any

    tasks: Array<Task>
    handleTask: Function
}

const content = CONTENT_PROJECT.tasks

function Tasks(props: IProps) {
    return (
        <div className={`${props.className}`}>
            <Row justify="center">
                <Col xs={24}>
                    <Row className={`${props.className}--title`}>
                        <span>{props.title}</span>
                    </Row>
                    <Row className={`${props.className}--tasks`}>
                        <Col xs={24}>
                            {props.tasks.length > 0 &&
                                props.tasks.map((value, index) => {
                                    if (value.status === props.filter)
                                        return (
                                            <Row
                                                key={`task-${index}`}
                                                className={`${props.className}--task`}
                                                onClick={() => props.handleTask(value, props.icon)}
                                            >
                                                <Col xs={24}>
                                                    <Row justify="space-between" align="middle">
                                                        <Col
                                                            xs={20}
                                                            className={`${props.className}--task-name`}
                                                        >
                                                            <props.icon /> <span>{value.name}</span>
                                                        </Col>
                                                        <span
                                                            className={`${props.className}--task-icon`}
                                                        >
                                                            <content.iconMenuTask />
                                                        </span>
                                                    </Row>
                                                    <Row justify="space-between">
                                                        <span
                                                            className={`${props.className}--task-time`}
                                                        >
                                                            <content.iconDeadline />{' '}
                                                            {moment(value.expires).format(
                                                                'DD/MM/YYYY'
                                                            )}
                                                        </span>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        )
                                })}

                            <Row className={`${props.className}--btn`}>
                                <Col xs={24}>
                                    <Row
                                        align="middle"
                                        onClick={() => props.actionDropdown('add-task')}
                                    >
                                        <span className={`${props.className}--btn-icon`}>
                                            <content.iconBtnAdd />
                                        </span>
                                        <span className={`${props.className}--btn-text`}>
                                            {content.textBtnAdd}
                                        </span>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Tasks
