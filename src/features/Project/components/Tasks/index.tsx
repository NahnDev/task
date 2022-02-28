import { Col, Row } from 'antd'
import { CONTENT_PROJECT } from '../../../../constants/global'

type IProps = {
    className: string
    title: string

    tasks: Array<any>
}

const content = CONTENT_PROJECT.tasks

function Tasks(props: IProps) {
    return (
        <Row justify="center" className={`${props.className}`}>
            <Col xs={24}>
                <Row className={`${props.className}--title`}>
                    <span>{props.title}</span>
                </Row>
                <Row className={`${props.className}--tasks`}>
                    <Col xs={24}>
                        {props.tasks.length > 0 &&
                            props.tasks.map((value, index) => {
                                return (
                                    <Row
                                        key={`task-${index}`}
                                        className={`${props.className}--task`}
                                    >
                                        <Col xs={24}>
                                            <Row justify="space-between" align="middle">
                                                <Col
                                                    xs={20}
                                                    className={`${props.className}--task-name`}
                                                >
                                                    <content.iconStatusTask />{' '}
                                                    <span>{value.name}</span>
                                                </Col>
                                                <span className={`${props.className}--task-icon`}>
                                                    <content.iconMenuTask />
                                                </span>
                                            </Row>
                                            <Row justify="space-between">
                                                <span className={`${props.className}--task-time`}>
                                                    deadline
                                                </span>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })}

                        <Row className={`${props.className}--btn`}>
                            <Col xs={24}>
                                <Row align="middle">
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
    )
}

export default Tasks
