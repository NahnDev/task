import { Col, Row } from 'antd'
import { CONTENT_COMPONENT } from '../../../../constants/global'

type TProps = {
    className: string
}

const content = CONTENT_COMPONENT.navbarCustom.help

function Help(props: TProps) {
    return (
        <Row justify="center" align="middle" className={`${props.className}`}>
            <span className={`${props.className}--icon`}>
                <content.icon />
            </span>
            <span className={`${props.className}--text`}>{content.text}</span>
        </Row>
    )
}

export default Help
