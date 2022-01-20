import * as Yup from 'yup'

export const validateFormSignIn = Yup.object().shape({
    phone: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
})

export const validateFormSignUp = Yup.object().shape({
    email: Yup.string().email('This field is email').required('This field is required'),
    phone: Yup.string().max(10, 'Maximum 10 characters').required('This field is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/,
            'At least 8 characters, 1 uppercase letter & 1 number'
        )
        .required('This field is required')
        .min(8, 'Minimum 8 characters'),
})
