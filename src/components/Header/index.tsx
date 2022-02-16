import { Col, Dropdown, Menu, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userApi from '../../api/userApi'
import { setUser } from '../../app/userSlice'
import { classComponent } from '../../constants/className'
import { User } from '../../types/global'
import Search from '../Search'
import UserDetail from './components/User'
import { DownOutlined } from '@ant-design/icons'

import './Header.scss'
import { NavLink } from 'react-router-dom'

type TProps = {
    className: string
    title: string
    dropdown?: any
    navigate?: Array<any>
}

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        </Menu.Item>
    </Menu>
)

const className = classComponent.header

function Header(props: TProps) {
    const user: User = useSelector((state: any) => state.user)
    const dispatch = useDispatch()

    const getUser = async (_id: string) => {
        try {
            const response: any = await userApi.getUserDetail(_id)
            dispatch(setUser(response))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser(user._id)
    }, [user.name !== undefined])

    return (
        <Row align="middle" justify="space-between" className={`${className} ${props.className}`}>
            <Col>
                <Row>
                    {props.dropdown ? (
                        <span className={`${className}__title`}>
                            {props.dropdown}

                            <Dropdown overlay={menu} placement="bottomRight" arrow>
                                <button className={`${className}__title--icon`}>
                                    <DownOutlined />
                                </button>
                            </Dropdown>
                        </span>
                    ) : (
                        <span className={`${className}__title`}>{props.title}</span>
                    )}
                </Row>
                {props.navigate && props.navigate.length && (
                    <Row className={`${className}__navigate`}>
                        {props.navigate.map((value, index) => {
                            return (
                                <Col key={`header-navigate-${index} `}>
                                    <NavLink
                                        to={value.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${className}__navigate--link active`
                                                : `${className}__navigate--link`
                                        }
                                    >
                                        {value.text}
                                    </NavLink>
                                </Col>
                            )
                        })}
                    </Row>
                )}
            </Col>
            <Col>
                <Row align="middle">
                    <Col className={`${className}__search`}>
                        <Search />
                    </Col>
                    <Col>
                        <UserDetail user={user} className={`${className}__detail`} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Header
