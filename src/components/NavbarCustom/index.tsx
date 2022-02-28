import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import projectsApi from '../../api/projectsApi'
import { list } from '../../app/projectsSlice'
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
    const dispatch = useDispatch()

    const getProjects = async () => {
        try {
            const response = await projectsApi.getProjects()
            dispatch(list(response))
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProjects()
    }, [projects.length > 0])

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
