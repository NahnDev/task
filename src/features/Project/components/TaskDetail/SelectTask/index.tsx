import { Row, Select, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import projectsApi from '../../../../../api/projectsApi'
import { randomColorAvatar } from '../../../../../functions/global'
import { Task } from '../../../../../types/global'

type SelectTaskProps = {
    className?: string
    name?: string
    label?: string

    task: Task
    changeAssignee: Function
}

const { Option } = Select

function SelectTask(props: SelectTaskProps) {
    const params: any = useParams()

    const [options, setOptions] = useState<any>([])
    const [defaultValues, setDefaultValues] = useState<any>(props.task.assignee)

    const getMembers = async (id: string) => {
        try {
            const response = await projectsApi.getMembers(id)
            setOptions(response)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMembers(params.id)
        setDefaultValues(props.task.assignee)
    }, [props.task])

    function tagRender(props: any) {
        const { label, value, closable, onClose } = props

        return (
            <Tag
                color={randomColorAvatar(value)}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
            >
                {label}
            </Tag>
        )
    }

    return (
        <Row align="middle" className={`${props.className}`}>
            {props.label && <label className={`${props.className}--label`}>{props.label}</label>}
            <Select
                mode={'tags'}
                bordered={false}
                className={`${props.className}--input`}
                value={defaultValues}
                onChange={(value) => setDefaultValues(value)}
                onBlur={() => props.changeAssignee(defaultValues, 'assignee')}
                tagRender={tagRender}
            >
                {options.map((value: any) => {
                    return (
                        <Option key={value._id} value={value._id}>
                            {value.user.name}
                        </Option>
                    )
                })}
            </Select>
        </Row>
    )
}

export default SelectTask
