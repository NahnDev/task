import { Col, Row } from 'antd'
import { Navigate, Route, Routes } from 'react-router-dom'
import { classAuth } from '../../constants/className'
import { ROUTER_AUTH } from '../../constants/routers'
import { TProps } from '../../types/auth'
import { Router } from '../../types/global'

import './Auth.scss'

function Auth(props: TProps) {
    return (
        <Row
            className={`${props.className} ${classAuth.auth}__bg`}
            justify={'end'}
            align={'middle'}
        >
            <Col xs={11}>
                <Row justify={'center'}>
                    <Col xs={20}>
                        <Routes>
                            <Route path="*" element={<Navigate to="login" />} />

                            {ROUTER_AUTH.map((value: Router, index: number) => {
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
