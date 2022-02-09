import { Col, Row } from 'antd'
import Header from '../../components/Header'
import { CONTENT_HOME } from '../../constants/global'

type Home = {
    className: string
}

const content = CONTENT_HOME

function Home(props: Home) {
    return (
        <Row className={props.className}>
            <Col xs={24}>
                <Header title={content.title} />
            </Col>
        </Row>
    )
}

export default Home
