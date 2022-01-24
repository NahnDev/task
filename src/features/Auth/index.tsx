import { Col, Row } from 'antd'
import { Navigate, Route, Routes } from 'react-router-dom'
import { classAuth } from '../../constants/className'
import { ROUTER_AUTH } from '../../constants/routers'
import { typeRouter } from '../../constants/type'

import './Auth.scss'

type Auth = {
    className: string
}

function Auth(props: Auth) {
    return (
        <Row
            className={`${props.className} ${classAuth.auth}__bg`}
            justify={'end'}
            align={'middle'}
        >
            <Col xs={11}>
                <Row justify={'center'}>
                    <Col xs={20} className={`${classAuth.auth}__form`}>
                        <Routes>
                            <Route path="*" element={<Navigate to="login" />} />

                            {ROUTER_AUTH.map((value: typeRouter, index: number) => {
                                return (
                                    <Route
                                        key={`router-auth-${index}`}
                                        path={value.path}
                                        element={
                                            <value.component
                                                className={`${classAuth.auth}__form`}
                                            />
                                        }
                                    />
                                )
                            })}
                        </Routes>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Auth
