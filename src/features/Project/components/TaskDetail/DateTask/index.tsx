import moment from 'moment'

import { DatePicker, Row } from 'antd'

import './DateTask.scss'
import { useEffect, useState } from 'react'
import { Task } from '../../../../../types/global'

type DateTaskProps = {
    className?: string
    name?: string
    label?: string

    task: Task
    changeExpires: Function
}

function DateTask(props: DateTaskProps) {
    const [valueInput, setValueInput] = useState<any>(moment(props.task.expires))

    useEffect(() => {
        setValueInput(props.task.expires)
    }, [props.task])

    return (
        <Row align="middle" className={`${props.className}`}>
            {props.label && <label className={`${props.className}--label`}>{props.label}</label>}
            <DatePicker
                allowClear={false}
                className={`${props.className}--input`}
                defaultValue={moment(props.task.expires)}
                value={moment(valueInput)}
                format={`DD/MM/YYYY`}
                onChange={(val) => setValueInput(val)}
                onBlur={() => props.changeExpires(valueInput, 'expires')}
            />
        </Row>
    )
}

export default DateTask
