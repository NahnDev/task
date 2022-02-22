import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { classComponent } from '../../constants/className'
import { TProps } from '../../types/auth'
import { Project } from '../../types/global'
import Help from './components/Help'
import Logo from './components/Logo'
import Navigate from './components/Navigate'
import ProjectElement from './components/Project'
import './NavbarCustom.scss'

const className = classComponent.navbarCustom

function NavbarCustom(props: TProps) {
    const projects: Array<Project> = useSelector((state: any) => state.projects) || []

    return (
        <Row className={className}>
            <Col xs={24}>
                <Logo className={`${className}__logo`} />
                <Navigate className={`${className}__navigate`} />

                <Row justify="center" className={`${className}__projects`}>
                    <Col xs={24}>
                        <Row>
                            <span className={`${className}__projects--title`}>Projects</span>
                        </Row>
                    </Col>
                    <Col xs={24} className={`${className}__projects--list`}>
                        {projects.length > 0 &&
                            projects.map((value, index) => {
                                console.log(value.members)
                                return (
                                    <ProjectElement
                                        key={`project-${index}`}
                                        className={`${className}__projects--item`}
                                        value={value}
                                    />
                                )
                            })}
                    </Col>
                </Row>

                <Help className={`${className}__help`} />
            </Col>
        </Row>
    )
}

export default NavbarCustom
