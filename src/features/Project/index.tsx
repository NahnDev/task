import { Row } from 'antd'
import { useParams } from 'react-router-dom'

type Project = {
    className: string
}

function Project(props: Project) {
    const params = useParams()
    console.log(params)
    return (
        <Row className={props.className}>
            <div>Project</div>
        </Row>
    )
}

export default Project
