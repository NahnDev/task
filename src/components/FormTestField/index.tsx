import React from 'react'
import { FastField, Form } from 'formik'

import InputField from '../../custom-fields/InputField'
import DateField from '../../custom-fields/DateField'
import ButtonField from '../../custom-fields/BtnSubmit'
import SelectField from '../../custom-fields/SelectField'

type FormProps = {
    handleSubmit: React.FormEventHandler<HTMLFormElement>
}

function FormTestField(props: FormProps) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <FastField component={InputField} name="phone" placeholder="username*" type="text" />
            <FastField
                label="password"
                component={InputField}
                name="password"
                placeholder="password*"
                type="password"
            />

            <FastField label="date" component={DateField} name="date" placeholder="date*" />
            <FastField
                label="select"
                component={SelectField}
                name="select"
                placeholder="select*"
                options={[
                    { value: '', name: 'Select an option' },
                    { value: 'option1', name: 'option 1' },
                    { value: 'option2', name: 'option 2' },
                    { value: 'option3', name: 'option 3' },
                ]}
            />

            <ButtonField type={'submit'} content={'SUBMIT'} className={'test'} />
        </Form>
    )
}

export default FormTestField
