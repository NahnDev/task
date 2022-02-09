import React, { Suspense } from 'react'

import { Col, Row, Spin } from 'antd'
import { useSelector } from 'react-redux'
import { classLayout } from './constants/className'

import './App.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ROUTER_MAIN } from './constants/routers'
import NavbarCustom from './components/NavbarCustom'
import { Router, User } from './types/global'

const Auth = React.lazy(() => import('./features/Auth'))

function App() {
    const user: User = useSelector((state: any) => state.user)

    return (
        <Suspense
            fallback={
                <Row className={classLayout.loading} justify="center" align="middle">
                    <div>
                        <Spin size="large" tip="Loading..." />
                    </div>
                </Row>
            }
        >
            {user.isLogin ? (
                <Row className={classLayout.app}>
                    <BrowserRouter>
                        <Col xs={5}>
                            <NavbarCustom className={classLayout.navbarCustom} />
                        </Col>
                        <Col xs={19}>
                            <Routes>
                                {ROUTER_MAIN.map((value: Router, index: number) => {
                                    return (
                                        <Route
                                            key={`router-main-${index}`}
                                            path={value.path}
                                            element={
                                                <value.component className={classLayout.body} />
                                            }
                                        />
                                    )
                                })}
                            </Routes>
                        </Col>
                    </BrowserRouter>
                </Row>
            ) : (
                <Row className={classLayout.app}>
                    <Col xs={24}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="*" element={<Navigate to="/auth" />} />
                                <Route
                                    path="auth/*"
                                    element={<Auth className={classLayout.auth} />}
                                ></Route>
                            </Routes>
                        </BrowserRouter>
                    </Col>
                </Row>
            )}
        </Suspense>
    )
}

export default App
