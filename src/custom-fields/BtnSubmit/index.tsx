import { Row } from 'antd'

type ButtonFieldProps = {
    content: string
    type: 'button' | 'submit' | 'reset' | undefined
    className: string
    icon?: any
}

function ButtonField(props: ButtonFieldProps) {
    const { content, type, className, icon } = props

    return (
        <Row align={'middle'} justify={'center'} className={className}>
            {icon && <span className={`${className}-icon`}>{icon}</span>}
            <button type={type} className={`${className}-content`}>
                {content}
            </button>
        </Row>
    )
}

export default ButtonField
