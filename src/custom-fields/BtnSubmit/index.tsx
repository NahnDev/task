type ButtonFieldProps = {
    content: string
    type: 'button' | 'submit' | 'reset' | undefined
    className: string
}

function ButtonField(props: ButtonFieldProps) {
    const { content, type, className } = props

    return (
        <button type={type} className={className}>
            {content}
        </button>
    )
}

export default ButtonField
