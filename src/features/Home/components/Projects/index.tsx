import { Col, Row } from 'antd'
import { CONTENT_HOME } from '../../../../constants/global'
import ProjectDetail from './ProjectDetail'

type IProps = {
    className: string
    listProject: Array<any>
    onClickAddProject: Function
}

const content = CONTENT_HOME.projects

function Projects(props: IProps) {
    return (
        <Row className={`${props.className}`}>
            <Col xs={24}>
                <Row align="middle" className={`${props.className}--title`}>
                    <span>{content.title}</span>
                </Row>
                <Row
                    align="middle"
                    className={`${props.className}--btn`}
                    onClick={() => props.onClickAddProject()}
                >
                    <span className={`${props.className}--btn-icon`}>
                        <content.iconAddProject />
                    </span>
                    <span className={`${props.className}--btn-text`}>{content.textAddProject}</span>
                </Row>
                <Row align="top" className={`${props.className}--projects`}>
                    {props.listProject &&
                        props.listProject.length > 0 &&
                        props.listProject.map((value, index) => {
                            return (
                                <ProjectDetail
                                    key={`project-${index}`}
                                    className={`${props.className}--project`}
                                    value={value}
                                />
                            )
                        })}
                </Row>
            </Col>
        </Row>
    )
}

export default Projects
