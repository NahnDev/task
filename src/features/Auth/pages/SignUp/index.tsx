import { Col, Row, Spin } from 'antd'
import { AxiosResponse } from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import authApi from '../../../../api/authApi'
import { CONTENT_AUTH } from '../../../../constants/global'
import { initialValuesFormSignUp } from '../../../../constants/initialValues'
import { validateFormSignUp } from '../../../../constants/validate'
import { openNotificationWithIcon } from '../../../../functions/global'
import { Form, ResSignUp, TProps } from '../../../../types/auth'
import FormSignUp from '../../components/FormSignUp'

const content = CONTENT_AUTH.formSignUp

function SignUp(props: TProps) {
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()

    const postSignUp = async (dataRequest: Form) => {
        try {
            setLoading(true)
            const response: AxiosResponse<ResSignUp, any> = await authApi.postAuthRegister(
                dataRequest
            )
            if (response) {
                openNotificationWithIcon(
                    'success',
                    'Registered successfully!',
                    'Please check gmail to activate the account'
                )
                setLoading(false)
                nav('/auth/login')
            }
        } catch (error) {
            console.log(error)
            openNotificationWithIcon(
                'warning',
                'Registered successfully!',
                'Please check gmail to activate the account'
            )
            console.log(error)
        }
    }

    const handleSubmit = (value: Form) => {
        postSignUp(value)
    }

    return (
        <Spin spinning={loading}>
            <Row justify="center" className={`${props.className}`}>
                <Col xs={24}>
                    <Row className={`${props.className}--header`}>
                        <span>{content.title}</span>
                    </Row>
                    <hr className={`${props.className}--hr`} />

                    <Row className={`${props.className}--body`}>
                        <Col xs={24}>
                            <Formik
                                initialValues={initialValuesFormSignUp}
                                validationSchema={validateFormSignUp}
                                onSubmit={handleSubmit}
                                render={FormSignUp}
                            />
                        </Col>
                    </Row>
                    <Row justify="center" className={`${props.className}--desc`}>
                        <span>{content.textDesc}</span>
                        <Row>
                            <NavLink className={`${props.className}--link`} to={content.pathLink}>
                                {content.textLink}
                            </NavLink>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Spin>
    )
}

export default SignUp
