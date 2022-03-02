import { Form, Select, Tag } from 'antd'
import { randomColorAvatar } from '../../functions/global'

type SelectFieldProps = {
    field: any
    form: any

    type: string
    label: string
    options: Array<any>
    placeholder: string
    disabled: boolean

    className: string
}

const { Option } = Select

function SelectField(props: SelectFieldProps) {
    const { field, form, options, label, disabled, className } = props

    const { name } = field

    const touched = form.touched[field.name]
    const hasError = form.errors[field.name]

    const submittedError = hasError
    const touchedError = hasError && touched

    const handleSelectedOptionChange = (selectedOption: any) => {
        const changeEvent = {
            target: {
                name: name,
                value: selectedOption,
            },
        }

        field.onChange(changeEvent)
    }

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
        <Form.Item
            help={submittedError || touchedError ? hasError : false}
            validateStatus={submittedError || touchedError ? 'error' : ''}
        >
            {label && (
                <label htmlFor={name} className={`${className}-label`}>
                    {label}
                </label>
            )}
            <Select
                mode={'tags'}
                id={name}
                {...field}
                bordered={false}
                className={`${className}-input-field`}
                defaultValue={[]}
                onChange={handleSelectedOptionChange}
                tagRender={tagRender}
            >
                {options.map((value) => {
                    return (
                        <Option key={value._id} value={value._id}>
                            {value.user.name}
                        </Option>
                    )
                })}
            </Select>
        </Form.Item>
    )
}

export default SelectField
