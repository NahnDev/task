import { Avatar, Col, Row } from 'antd'
import { CONTENT_HOME } from '../../../../../constants/global'
import { Project } from '../../../../../types/global'
import { NavLink } from 'react-router-dom'
import { randomColorAvatar } from '../../../../../functions/global'

type IProps = {
    className: string
    value: Project
}

const content = CONTENT_HOME.projects.project

function ProjectDetail(props: IProps) {
    return (
        <Col xs={12}>
            <NavLink to={`/project/${props.value._id}`}>
                <Row align="middle" className={`${props.className}`}>
                    <Col xs={7} className={`${props.className}-avatar`}>
                        <Avatar
                            shape="square"
                            size={55}
                            style={{
                                backgroundColor: randomColorAvatar(props.value._id),
                                borderRadius: 15,
                            }}
                        >
                            {props.value.name?.slice(0, 1)}
                        </Avatar>
                    </Col>
                    <Col xs={17}>
                        <Row className={`${props.className}-name`}>
                            <span>{props.value.name}</span>
                        </Row>
                        <Row className={`${props.className}-member`}>
                            <Avatar.Group maxCount={3} size="small">
                                {props.value.members.map((value, index) => {
                                    return (
                                        <Avatar
                                            key={`avatar-mem-project-${index}`}
                                            style={{
                                                backgroundColor: randomColorAvatar(value.user._id),
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
                        </Row>
                    </Col>
                </Row>
            </NavLink>
        </Col>
    )
}

export default ProjectDetail
