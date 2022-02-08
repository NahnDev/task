import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import projectsApi from '../../api/projectsApi'
import { classComponent } from '../../constants/className'
import { TProps } from '../../types/auth'
import Help from './components/Help'
import Logo from './components/Logo'
import Navigate from './components/Navigate'
import Project from './components/Project'
import './NavbarCustom.scss'

const className = classComponent.navbarCustom

function NavbarCustom(props: TProps) {
    const [projects, setProjects] = useState([
        { _id: '13u5313', name: 'Test Project 1' },
        { _id: '13u5313', name: 'Test Project 2' },
    ])
    const getProjects = async () => {
        try {
            const response = await projectsApi.getProjects()

            if (response) {
                console.log(response)
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        // getProjects()
    }, [])

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
                                    <Project
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
