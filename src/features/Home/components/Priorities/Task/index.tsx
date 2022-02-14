import { Row } from 'antd'
import { CONTENT_HOME } from '../../../../../constants/global'

type IProps = {
    className: string
    value: any
}

const content = CONTENT_HOME.priorities.iconStatus

function Task(props: IProps) {
    return (
        <Row align="middle" className={props.className}>
            {content.map((value, index) => {
                if (value.value === props.value.status)
                    return (
                        <span key={`task-icon-${index}`} className={`${props.className}-icon`}>
                            <value.icon key={`icon-${index}`} />
                        </span>
                    )
            })}
            <span className={`${props.className}-text`}>{`${props.value.name}`}</span>
        </Row>
    )
}

export default Task
