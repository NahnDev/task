import { FastField, Form } from 'formik'
import { classAuth } from '../../../../constants/className'
import { CONTENT_AUTH } from '../../../../constants/global'
import ButtonField from '../../../../custom-fields/BtnSubmit'
import InputField from '../../../../custom-fields/InputField'

import { UserOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons'

type formSignUp = {
    handleSubmit: any
}

function FormSignUp(props: formSignUp) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <FastField
                component={InputField}
                name="name"
                placeholder="Name*"
                type="text"
                className={`${classAuth.form}--field`}
                icon={<IdcardOutlined />}
            />
            <FastField
                component={InputField}
                name="username"
                placeholder="Username*"
                type="text"
                className={`${classAuth.form}--field`}
                icon={<UserOutlined />}
            />
            <FastField
                component={InputField}
                name="password"
                placeholder="Password*"
                type="password"
                className={`${classAuth.form}--field`}
                icon={<LockOutlined />}
            />

            <ButtonField
                content={CONTENT_AUTH.formSignUp.textBtn}
                type="submit"
                className={`${classAuth.form}--btn`}
            />
        </Form>
    )
}

export default FormSignUp
