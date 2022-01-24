import { Col, Row, Spin } from 'antd'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CONTENT_AUTH } from '../../../../constants/global'
import { initialValuesFormSignIn } from '../../../../constants/initialValues'
import { validateFormSignIn } from '../../../../constants/validate'
import ButtonField from '../../../../custom-fields/BtnSubmit'
import FormSignIn from '../../components/FormSignIn'

import { GooglePlusOutlined } from '@ant-design/icons'

type SignIn = {
    className: string
}

const content = CONTENT_AUTH.formSignIn

function SignIn(props: SignIn) {
    const [loading, setLoading] = useState(false)
    const handleSubmit = (value: object) => {
        console.log(value)
    }
    return (
        <Row justify="center">
            <Col xs={24}>
                <Row className={`${props.className}`}>
                    <Col xs={24}>
                        <Row className={`${props.className}--header`}>
                            <span>{content.title}</span>
                        </Row>
                        <hr className={`${props.className}--hr`}></hr>
                        <ButtonField
                            content={'Sign in with Google'}
                            type="button"
                            className={`${props.className}--gg`}
                            icon={<GooglePlusOutlined />}
                        />
                        <hr className={`${props.className}--hr`}></hr>

                        <Row className={`${props.className}--body`}>
                            <Col xs={24}>
                                <Spin spinning={loading}>
                                    <Formik
                                        initialValues={initialValuesFormSignIn}
                                        validationSchema={validateFormSignIn}
                                        onSubmit={handleSubmit}
                                        render={FormSignIn}
                                    />
                                </Spin>
                            </Col>
                        </Row>
                        <Row justify="center" className={`${props.className}--desc`}>
                            <span>{content.textDesc}</span>
                            <Row>
                                <NavLink
                                    className={`${props.className}--link`}
                                    to={content.pathLink}
                                >
                                    {content.textLink}
                                </NavLink>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default SignIn
