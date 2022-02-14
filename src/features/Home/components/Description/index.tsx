import { Col, Row } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { CONTENT_HOME } from '../../../../constants/global'
import { User } from '../../../../types/global'

type IProps = {
    className: string
    listProject: Array<any>
}

const content = CONTENT_HOME.descriptionContent

function Description(props: IProps) {
    const user: User = useSelector((state: any) => state.user)
    const now = moment().format('dddd, MMMM Do')

    return (
        <>
            <Row justify="center" align="middle">
                <Col xs={12} className={`${props.className}`}>
                    <span className={`${props.className}--text`}>{now}</span>
                    <span
                        className={`${props.className}--text`}
                    >{`${content.textDesc} ${user.name}`}</span>
                </Col>
            </Row>
            <Row justify="center" align="middle">
                <Col xs={10} className={`${props.className}--box`}>
                    <Row justify="center" align="middle">
                        <Col xs={12} className={`${props.className}--desc`}>
                            <content.iconTask /> {`0 ${content.textTask}`}
                        </Col>
                        <Col xs={12} className={`${props.className}--desc`}>
                            <content.iconProject />{' '}
                            {`${props.listProject.length} ${content.textProjects}`}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Description
