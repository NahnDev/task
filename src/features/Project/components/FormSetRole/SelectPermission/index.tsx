import { Row, Select } from 'antd'
import { Role } from '../../../../../types/global'

type SelectPermissionProps = {
    className?: string
    label?: string
    value: any

    options: Array<Role>
    onChange: Function
}

const { Option } = Select

function SelectPermission(props: SelectPermissionProps) {
    return (
        <Row align="middle" className={`${props.className}`}>
            {props.label && <label className={`${props.className}--label`}>{props.label}</label>}

            <Select
                defaultValue={props.value ? props.value._id : ''}
                bordered={false}
                className={`${props.className}--input`}
                onChange={(val) => props.onChange(val)}
            >
                {props.options.map((value: Role) => {
                    if (!value.default)
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
