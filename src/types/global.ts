export type Router = {
    path: string
    component: any
    role?: Array<string>
    isLogin: boolean
}

export interface Token {
    accessToken: string
    refreshToken: string
    expires: number
}

export interface User {
    _id: string
    name?: string
    email?: string
    active?: string
    isAdmin?: boolean

    isLogin?: boolean
}
