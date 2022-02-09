import { Col, Row } from 'antd'
import { Navigate, Route, Routes } from 'react-router-dom'

import Header from '../../components/Header'
import { CONTENT_INBOX } from '../../constants/global'
import { ROUTER_INBOX } from '../../constants/routers'
import { Router } from '../../types/global'

type Inbox = {
    className: string
}

const content = CONTENT_INBOX

function Inbox(props: Inbox) {
    return (
        <Row className={props.className}>
            <Col xs={24}>
                <Header title={content.title} navigate={content.navigate} />
                <Routes>
                    <Route path="*" element={<Navigate to="/inbox/messages" />} />

                    {ROUTER_INBOX.map((value: Router, index: number) => {
                        return (
                            <Route
                                key={`router-auth-${index}`}
                                path={value.path}
                                element={<value.component />}
                            />
                        )
                    })}
                </Routes>
            </Col>
        </Row>
    )
}

export default Inbox
