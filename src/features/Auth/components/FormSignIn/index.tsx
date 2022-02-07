import { FastField, Form } from 'formik'
import { classAuth } from '../../../../constants/className'
import { CONTENT_AUTH } from '../../../../constants/global'
import ButtonField from '../../../../custom-fields/BtnSubmit'
import InputField from '../../../../custom-fields/InputField'

import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { HandleForm } from '../../../../types/auth'

function FormSignIn(props: HandleForm) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <FastField
                component={InputField}
                name="email"
                placeholder="Email*"
                type="text"
                className={`${classAuth.form}--field`}
                icon={<MailOutlined />}
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
                content={CONTENT_AUTH.formSignIn.textBtn}
                type="submit"
                className={`${classAuth.form}--btn`}
            />
        </Form>
    )
}

export default FormSignIn
