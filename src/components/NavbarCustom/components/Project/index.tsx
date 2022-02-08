import { Avatar, Col, Row } from 'antd'
import { CONTENT_COMPONENT } from '../../../../constants/global'

type TProps = {
    className: string
    value: any
}

const content = CONTENT_COMPONENT.navbarCustom.projectDetail

function Project(props: TProps) {
    return (
        <Row className={`${props.className}`}>
            <Col xs={24}>
                <Row>
                    <Col className={`${props.className}--title`}>
                        <span>{props.value.name}</span>
                    </Col>
                </Row>
                <Row justify="space-between">
                    <Col className={`${props.className}--list-avatar`}>
                        <Avatar.Group maxCount={3} size="small">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                        </Avatar.Group>
                    </Col>
                    <Col className={`${props.className}--btn-invite`}>
                        <content.iconBtn /> <span>{content.textBtn}</span>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Project
