import { FastField, Form } from 'formik'
import { classHome } from '../../../../constants/className'
import { CONTENT_HOME } from '../../../../constants/global'
import ButtonField from '../../../../custom-fields/BtnSubmit'
import InputField from '../../../../custom-fields/InputField'

import { HandleForm } from '../../../../types/auth'

const content = CONTENT_HOME.formProject

function FormProject(props: HandleForm) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <FastField
                component={InputField}
                name={content.fieldsName.name}
                type={content.fieldsName.type}
                className={`${classHome.form}--field`}
                label={content.fieldsName.label}
            />

            <ButtonField
                content={content.btnSubmit}
                type="submit"
                className={`${classHome.form}--btn`}
            />
        </Form>
    )
}

export default FormProject
