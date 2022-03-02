import { Col, Row } from 'antd'
import { FastField, Form } from 'formik'
import { useSelector } from 'react-redux'
import { classProject } from '../../../../constants/className'
import { CONTENT_PROJECT } from '../../../../constants/global'
import ButtonField from '../../../../custom-fields/BtnSubmit'
import DateField from '../../../../custom-fields/DateField'
import InputField from '../../../../custom-fields/InputField'
import SelectField from '../../../../custom-fields/SelectField'

import { HandleForm } from '../../../../types/auth'
import { Project } from '../../../../types/global'

const content = CONTENT_PROJECT.formTask

function FormTask(props: HandleForm) {
    const project: Project = useSelector((state: any) => state.project)

    return (
        <Form onSubmit={props.handleSubmit}>
            <FastField
                component={InputField}
                name={content.fieldsName.name}
                type={content.fieldsName.type}
                className={`${classProject.form}--field`}
                label={content.fieldsName.label}
            />
            <Row>
                <Col xs={12}>
                    <FastField
                        component={DateField}
                        name={content.fieldsExpires.name}
                        className={`${classProject.form}--field`}
                        label={content.fieldsExpires.label}
                    />
                </Col>
                <Col xs={12}>
                    <FastField
                        component={SelectField}
                        name={content.fieldsUser.name}
                        className={`${classProject.form}--field`}
                        label={content.fieldsUser.label}
                        options={project.members}
                    />
                </Col>
            </Row>

            <ButtonField
                content={content.btnSubmit}
                type="submit"
                className={`${classProject.form}--btn`}
            />
        </Form>
    )
}

export default FormTask
