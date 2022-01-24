import { Col, Row } from 'antd'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTER_AUTH } from '../../constants/routers'
import { typeRouter } from '../../constants/type'

type Auth = {
    className: string
}

function Auth(props: Auth) {
    return (
        <Row className={props.className} justify={'end'} align={'middle'}>
            <Col xs={10}>
                <Routes>
                    <Route path="*" element={<Navigate to="login" />} />

                    {ROUTER_AUTH.map((value: typeRouter, index: number) => {
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

export default Auth
