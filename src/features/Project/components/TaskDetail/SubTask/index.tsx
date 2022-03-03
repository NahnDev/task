import { Col, Row } from 'antd'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import ModalCustom from '../../../../../components/ModalCustom'
import { CONTENT_PROJECT } from '../../../../../constants/global'
import { initialValuesFormProjectAddSubTask } from '../../../../../constants/initialValues'
import { validateFormProjectAddTask } from '../../../../../constants/validate'

import { Task } from '../../../../../types/global'
import FormSubTask from '../../FormSubTask'

type SubTaskProps = {
    className?: string
    icon: any
    task: Task
    handleSubmit: Function
    handleChangeSubtask: Function
}

const content = CONTENT_PROJECT.tasks.subtask

function SubTask(props: SubTaskProps) {
    const [contentModal, setContentModal] = useState<any>(<></>)
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        const temp = (
            <Formik
                initialValues={initialValuesFormProjectAddSubTask}
                validationSchema={validateFormProjectAddTask}
                onSubmit={(valueForm) => {
                    setVisible(false)
                    props.handleSubmit(valueForm)
                }}
                render={FormSubTask}
            />
        )
        setContentModal({ title: content.title, temp: temp })
    }, [props.task, visible])

    return (
        <Row align="middle" className={`${props.className}`}>
            <Col xs={24}>
                <Row>
                    <button className={`${props.className}--btn`} onClick={() => setVisible(true)}>
                        {content.btnAdd}
                    </button>
                </Row>
                <span className={`${props.className}--title`}>{content.title}</span>
                <Row>
                    <Col xs={24} className={`${props.className}--list`}>
                        {props.task.subtask_order?.map((value: any, index) => {
                            return (
                                <Row
                                    key={`subtask-${index}`}
                                    align="middle"
                                    justify="space-between"
                                    className={`${props.className}--item`}
                                >
                                    <div>
                                        <props.icon /> <span>{value.name}</span>
                                    </div>
                                    {!value.complete && (
                                        <div className={`${props.className}--icon`}>
                                            <content.iconCheck
                                                onClick={() =>
                                                    props.handleChangeSubtask(value, 'complete')
                                                }
                                            />
                                            <content.iconCancel
                                                onClick={() =>
                                                    props.handleChangeSubtask(value, 'delete')
                                                }
                                            />
                                        </div>
                                    )}
                                </Row>
                            )
                        })}
                    </Col>
                </Row>
            </Col>

            <ModalCustom
                loading={false}
                contentModal={contentModal.temp}
                visible={visible}
                closeModal={(value: boolean) => {
                    setVisible(value)
                }}
                title={contentModal.title}
            />
        </Row>
    )
}

export default SubTask
