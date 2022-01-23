import { Form, Input } from 'antd'

type InputFieldProps = {
    field: any
    form: any

    type: string
    label: string
    placeholder: string
    disabled: boolean

    className: string
}

function InputField(props: InputFieldProps) {
    const { field, form, label, type, placeholder, disabled, className } = props

    const { name } = field

    const touched = form.touched[field.name]
    const hasError = form.errors[field.name]
    const submittedError = hasError
    const touchedError = hasError && touched

    return (
        <Form.Item
            help={submittedError || touchedError ? hasError : false}
            validateStatus={submittedError || touchedError ? 'error' : ''}
        >
            {label && (
                <label htmlFor={name} className={`${className}__label`}>
                    {label}
                </label>
            )}
            <Input
                id={name}
                className={`${className}__input`}
                {...field}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                bordered={false}
            />
        </Form.Item>
    )
}

export default InputField
