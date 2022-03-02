import { Row, Select, Tag } from 'antd'
import { useState } from 'react'
import { randomColorAvatar } from '../../../../../functions/global'

type SelectPermissionProps = {
    className?: string
    label?: string
    value: any

    options: Array<{ _id: string; name: string }>
    onChange: Function
}

const { Option } = Select

function SelectPermission(props: SelectPermissionProps) {
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
                value={props.value.permission}
                onChange={(val) => props.onChange(val)}
                tagRender={tagRender}
            >
                {props.options.map((value: any) => {
                    return (
                        <Option key={value._id} value={value._id}>
                            {value.name}
                        </Option>
                    )
                })}
            </Select>
        </Row>
    )
}

export default SelectPermission
