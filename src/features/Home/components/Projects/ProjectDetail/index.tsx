import { Avatar, Col, Row } from 'antd'
import { CONTENT_HOME } from '../../../../../constants/global'
import { Project } from '../../../../../types/global'

type IProps = {
    className: string
    value: Project
}

const content = CONTENT_HOME.projects.project

function ProjectDetail(props: IProps) {
    return (
        <Col xs={12}>
            <Row align="middle" className={`${props.className}`}>
                <Col xs={7} className={`${props.className}-avatar`}>
                    <Avatar
                        shape="square"
                        size={55}
                        style={{ color: '#f56a00', backgroundColor: '#fde3cf', borderRadius: 15 }}
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
                                        style={{ backgroundColor: '#f56a00' }}
                                    >
                                        {value.user.name?.slice(0, 1)}
                                    </Avatar>
                                )
                            })}
                        </Avatar.Group>
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}

export default ProjectDetail
