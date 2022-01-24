import { Col, Row, Spin } from 'antd'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CONTENT_AUTH } from '../../../../constants/global'
import { initialValuesFormSignUp } from '../../../../constants/initialValues'
import { validateFormSignUp } from '../../../../constants/validate'
import FormSignUp from '../../components/FormSignUp'

type SignUp = {
    className: string
}

const content = CONTENT_AUTH.formSignUp

function SignUp(props: SignUp) {
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

                        <Row className={`${props.className}--body`}>
                            <Col xs={24}>
                                <Spin spinning={loading}>
                                    <Formik
                                        initialValues={initialValuesFormSignUp}
                                        validationSchema={validateFormSignUp}
                                        onSubmit={handleSubmit}
                                        render={FormSignUp}
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

export default SignUp
