import { Col, Row, Spin } from 'antd';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { CONTENT_AUTH } from '../../../../constants/global';
import { initialValuesFormSignIn } from '../../../../constants/initialValues';
import { validateFormSignIn } from '../../../../constants/validate';
import ButtonField from '../../../../custom-fields/BtnSubmit';
import FormSignIn from '../../components/FormSignIn';

import { GooglePlusOutlined } from '@ant-design/icons';
import authApi from '../../../../api/authApi';
import { setUserLogin } from '../../../../app/userSlice';
import { openNotificationWithIcon } from '../../../../functions/global';
import { Form, TProps } from '../../../../types/auth';

const content = CONTENT_AUTH.formSignIn;

function SignIn(props: TProps) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const postSignIn = async (dataRequest: Form) => {
        try {
            setLoading(true);
            const response = await authApi.postAuthLogin(dataRequest);

            if (response) {
                setLoading(false);
                dispatch(setUserLogin({ ...response, isLogin: true }));
                openNotificationWithIcon('success', 'Login successfully!', '');
                nav('/home');
            }
        } catch (error: any) {
            setLoading(false);
            openNotificationWithIcon('warning', error.response.data.message, '');
        }
    };

    const handleSubmit = (value: Form) => postSignIn(value);

    // const handleSignInGG = () => {
    //     window.open(
    //         'http://localhost:8080/auth/google-login',
    //         'MsgWindow',
    //         'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=600'
    //     )
    // }
    return (
        <Spin spinning={loading}>
            <Row justify="center" className={`${props.className}`}>
                <Col xs={24}>
                    <Row className={`${props.className}--header`}>
                        <span>{content.title}</span>
                    </Row>
                    <hr className={`${props.className}--hr`} />
                    <a
                        style={{ padding: '0.5em' }}
                        href="/auth/google-login"
                        type="button"
                        className={`${props.className}--gg`}
                        // handleClick={() => handleSignInGG()}
                    >
                        <Row justify="center" align="middle">
                            <GooglePlusOutlined
                                style={{
                                    fontSize: '1.5em',
                                    marginRight: '0.5em',
                                    marginLeft: '0.5em',
                                }}
                            />
                            Sign in with Google
                        </Row>
                    </a>
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
    );
}

export default SignIn;
