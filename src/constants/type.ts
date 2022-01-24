export type typeUser = {
    isLogin: boolean
}
export type typeRouter = {
    path: string
    component: any
    role?: Array<string>
    isLogin: boolean
}

interface AntdIconProps {
    className?: string
    onClick?: React.MouseEventHandler<SVGSVGElement>
    style?: React.CSSProperties
}
