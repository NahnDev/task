import { Col, Row, Spin } from 'antd'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import authApi from '../../../../api/authApi'
import { setUser } from '../../../../app/userSlice'
import { CONTENT_AUTH } from '../../../../constants/global'
import { initialValuesFormSignUp } from '../../../../constants/initialValues'
import { typeDataRegister } from '../../../../constants/type'
import { validateFormSignUp } from '../../../../constants/validate'
import FormSignUp from '../../components/FormSignUp'

type SignUp = {
    className: string
}

const content = CONTENT_AUTH.formSignUp

function SignUp(props: SignUp) {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const postSignUp = async (dataRequest: typeDataRegister) => {
        try {
            setLoading(true)
            const response = await authApi.postAuthRegister(dataRequest)
            if (response) {
                dispatch(setUser(response))
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (value: typeDataRegister) => {
        console.log(value)
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
