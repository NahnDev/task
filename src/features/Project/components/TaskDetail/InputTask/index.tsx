import { Input, Row } from 'antd'
import { useEffect, useState } from 'react'
import { Task } from '../../../../../types/global'

type IProps = {
    className?: string
    placeholder?: string
    name?: string
    value?: any
    label?: string

    task: Task
}

function InputTask(props: IProps) {
    const [valueInput, setValueInput] = useState<string>(props.task.name)

    useEffect(() => {
        setValueInput(props.task.name)
    }, [props.task])

    return (
        <Row justify="center" align="middle" className={`${props.className}`}>
            {props.label && (
                <label htmlFor={props.name} className={`${props.className}--label`}>
                    {props.label}
                </label>
            )}
            <Input
                name={props.name}
                className={`${props.className}--input`}
                placeholder={props.placeholder}
                defaultValue={props.task.name}
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                bordered={false}
            />
        </Row>
    )
}

export default InputTask
