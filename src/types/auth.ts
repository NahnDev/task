import { FormEventHandler } from 'react'
import { User } from './global'

export type TProps = {
    className: string
}

export type Form = {
    name?: string
    email: string
    password: string
}

export type HandleForm = {
    handleSubmit: FormEventHandler<HTMLFormElement>
}

export type ResSignUp = {
    _id?: string
    name?: string
    email?: string
    active?: string
    isAdmin?: boolean
}

export type ResSignIn = {
    user: User
    accessToken: string
    refreshToken: string
    expires: number
}
