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
import authApi from '../../../../api/authApi'

type SignIn = {
    className: string
}

const content = CONTENT_AUTH.formSignIn

function SignIn(props: SignIn) {
    const [loading, setLoading] = useState(false)

    const getGoogleLogin = async () => {
        try {
            setLoading(true)
            const response = await authApi.getGoogleLogin()
            if (response) {
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (value: object) => {
        console.log(value)
    }

    const handleSignInGG = () => {
        getGoogleLogin()
        console.log('SignIn GG')
    }
    return (
        <Spin spinning={loading}>
            <Row justify="center" className={`${props.className}`}>
                <Col xs={24}>
                    <Row className={`${props.className}--header`}>
                        <span>{content.title}</span>
                    </Row>
                    <hr className={`${props.className}--hr`} />
                    <ButtonField
                        content={'Sign in with Google'}
                        type="button"
                        className={`${props.className}--gg`}
                        icon={<GooglePlusOutlined />}
                        handleClick={() => handleSignInGG()}
                    />
                    <hr className={`${props.className}--hr`} />

                    <Row className={`${props.className}--body`}>
                        <Col xs={24}>
                            <Formik
                                initialValues={initialValuesFormSignIn}
                                validationSchema={validateFormSignIn}
                                onSubmit={handleSubmit}
                                render={FormSignIn}
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

export default SignIn
