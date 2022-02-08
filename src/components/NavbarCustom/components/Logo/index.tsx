import { Col, Row } from 'antd'
import { CONTENT_COMPONENT } from '../../../../constants/global'

type TProps = {
    className: string
}

const content = CONTENT_COMPONENT.navbarCustom.logo

function Logo(props: TProps) {
    return (
        <Row justify="space-between" align="middle" className={`${props.className}`}>
            <Col className={`${props.className}--img`}>
                <img src={`${content.imgLogo}`} alt={`${content.altImg}`} />
            </Col>
            <Col className={`${props.className}--icon`}>
                <content.icon />
            </Col>
        </Row>
    )
}

export default Logo
