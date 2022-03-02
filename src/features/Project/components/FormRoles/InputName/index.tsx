import { Input, Row } from 'antd'

type IProps = {
    className?: string
    placeholder?: string
    name?: string
    label?: string
    value: any

    onChange: Function
}

function InputName(props: IProps) {
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
                bordered={false}
                value={props.value.name}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </Row>
    )
}

export default InputName
