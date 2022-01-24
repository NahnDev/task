import * as Yup from 'yup'

export const validateFormSignIn = Yup.object().shape({
    username: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
})

export const validateFormSignUp = Yup.object().shape({
    name: Yup.string().required('This field is required'),
    username: Yup.string().required('This field is required'),
    password: Yup.string()
        // .matches(
        //     /(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]/,
        //     'At least 8 characters, 1 uppercase letter & 1 number'
        // )
        .required('This field is required')
        .min(8, 'Minimum 8 characters'),
})
