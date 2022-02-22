import { Avatar, Col, Row } from 'antd'
import { NavLink } from 'react-router-dom'
import { CONTENT_COMPONENT } from '../../../../constants/global'
import { randomColorAvatar } from '../../../../functions/global'

type TProps = {
    className: string
    value: any
}

const content = CONTENT_COMPONENT.navbarCustom.projectDetail

function Project(props: TProps) {
    return (
        <NavLink to={`/project/${props.value._id}`}>
            <Row className={`${props.className}`}>
                <Col xs={24}>
                    <Row>
                        <Col className={`${props.className}--title`}>
                            <span>{props.value.name}</span>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col xs={12} className={`${props.className}--list-avatar`}>
                            <Avatar.Group maxCount={3} size="small">
                                {props.value.members &&
                                    props.value.members.map((value: any, index: number) => {
                                        return (
                                            <Avatar
                                                key={`avatar-mem-project-nav-${index}`}
                                                style={{
                                                    backgroundColor: randomColorAvatar(
                                                        value.user._id
                                                    ),
                                                }}
                                            >
                                                {value.user.name?.slice(
                                                    value.user.name?.indexOf(' ') + 1,
                                                    value.user.name?.indexOf(' ') + 2
                                                )}
                                            </Avatar>
                                        )
                                    })}
                            </Avatar.Group>
                        </Col>
                        <Col xs={12} className={`${props.className}--btn-invite`}>
                            <content.iconBtn /> <span>{content.textBtn}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </NavLink>
    )
}

export default Project
