import { Col, Input, Row } from 'antd'
import { useEffect, useState } from 'react'
import { classProject } from '../../../../../constants/className'
import { CONTENT_PROJECT } from '../../../../../constants/global'
import { Task } from '../../../../../types/global'

type IProps = {
    className: string
    icon: string
    task: Task
    changeName: Function
    handleTask: Function
}
const content = CONTENT_PROJECT.tasks

function HeaderTask(props: IProps) {
    const [valueInput, setValueInput] = useState<string>(props.task.name)

    useEffect(() => {
        setValueInput(props.task.name)
    }, [props.task])

    return (
        <Row justify="center" align="middle" className={`${props.className}`}>
            <span className={`${props.className}--icon`}>
                <props.icon />
            </span>
            <Input
                name={props.task.name}
                className={`${props.className}--input`}
                defaultValue={props.task.name}
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                onBlur={() => props.changeName(valueInput, 'name')}
                bordered={false}
            />
            <span
                className={`${props.className}--icon-delete`}
                onClick={() => props.handleTask(props.task._id, 'delete-task')}
            >
                <content.iconDeleteTask />
            </span>
        </Row>
    )
}

export default HeaderTask
