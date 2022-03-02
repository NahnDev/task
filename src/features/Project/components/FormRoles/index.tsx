import { FastField, Form } from 'formik'
import { classProject } from '../../../../constants/className'
import { CONTENT_PROJECT } from '../../../../constants/global'
import ButtonField from '../../../../custom-fields/BtnSubmit'
import InputField from '../../../../custom-fields/InputField'

import { HandleForm } from '../../../../types/auth'

const content = CONTENT_PROJECT.formRoles

function FormRoles(props: HandleForm) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <FastField
                component={InputField}
                name={content.fieldsName.name}
                type={content.fieldsName.type}
                className={`${classProject.form}--field`}
                label={content.fieldsName.label}
            />

            <ButtonField
                content={content.btnSubmit}
                type="submit"
                className={`${classProject.form}--btn`}
            />
        </Form>
    )
}

export default FormRoles
