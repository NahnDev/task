import { Col, Dropdown, Input, Menu, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userApi from '../../api/userApi'
import { setSignOut, setUser } from '../../app/userSlice'
import { classComponent } from '../../constants/className'
import { User } from '../../types/global'
import Search from '../Search'
import UserDetail from './components/User'
import { DownOutlined } from '@ant-design/icons'

import './Header.scss'
import { NavLink } from 'react-router-dom'
import { CONTENT_COMPONENT } from '../../constants/global'

type TProps = {
    className: string
    title?: string
    dropdown?: any
    actionDropdown?: Function
    navigate?: Array<any>

    changeNameProject?: Function
}

const content = CONTENT_COMPONENT.header
const className = classComponent.header

function Header(props: TProps) {
    const user: User = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const [title, setTitle] = useState<string>(props.dropdown)

    const menuDropdown = (
        <Menu
            onClick={(value) => {
                if (props.actionDropdown) props.actionDropdown(value.key)
            }}
        >
            {content.menuDropdown.map((value) => {
                return (
                    <Menu.Item key={value.key}>
                        <value.icon /> {value.text}
                    </Menu.Item>
                )
            })}
        </Menu>
    )

    const menuUser = (
        <Menu onClick={(value) => handleUser(value.key)}>
            {content.menuUser.map((value) => {
                return (
                    <Menu.Item key={value.key}>
                        <value.icon /> {value.text}
                    </Menu.Item>
                )
            })}
        </Menu>
    )

    const getUser = async (_id: string) => {
        try {
            const response: any = await userApi.getUserDetail(_id)
            dispatch(setUser(response))
        } catch (error) {
            console.log(error)
        }
    }

    const handleUser = (value: any) => {
        switch (value) {
            case 'profile':
                break
            case 'logout':
                dispatch(setSignOut({ isLogin: false, _id: '' }))
                break
            default:
                break
        }
    }

    useEffect(() => {
        getUser(user._id)
        setTitle(props.dropdown)
    }, [user.name !== undefined, props.dropdown])

    return (
        <Row align="middle" justify="space-between" className={`${className} ${props.className}`}>
            <Col>
                <Row>
                    {props.dropdown ? (
                        <span className={`${className}__title`}>
                            <Dropdown overlay={menuDropdown} placement="bottomLeft" arrow>
                                <button className={`${className}__title--icon`}>
                                    <DownOutlined />
                                </button>
                            </Dropdown>

                            <Input
                                className={`${className}__title--input`}
                                bordered={false}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={() => {
                                    props.changeNameProject &&
                                        props.changeNameProject(title || props.dropdown)
                                }}
                            />
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
                        <Search onSearch={(value: any) => console.log(value)} />
                    </Col>
                    <Col>
                        <UserDetail
                            menuUser={menuUser}
                            user={user}
                            className={`${className}__detail`}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Header
