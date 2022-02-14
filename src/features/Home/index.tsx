import { Col, Row } from 'antd'
import { useState, useEffect } from 'react'
import projectApi from '../../api/projectsApi'

import Header from '../../components/Header'
import { classHome, classLayout } from '../../constants/className'
import { CONTENT_HOME } from '../../constants/global'
import { Project } from '../../types/global'
import Description from './components/Description'
import Priorities from './components/Priorities'
import Projects from './components/Projects'

import './Home.scss'

type Home = {
    className: string
}

const content = CONTENT_HOME
const className = classHome.home

function Home(props: Home) {
    const [projects, setProjects] = useState<Array<Project>>([])

    const getProjects = async () => {
        try {
            const response = await projectApi.getProjects()
            setProjects(response)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProjects()
    }, [projects !== null])
    return (
        <Row className={`${props.className} ${className}`}>
            <Col xs={24}>
                <Header className={classLayout.header} title={content.title} />
                <Description className={`${className}__desc`} listProject={projects} />
                <Row justify="center">
                    <Col xs={12}>
                        <Priorities
                            className={`${className}__priorities`}
                            listTask={[
                                { name: 'test task 1', status: 'doing' },
                                { name: 'test task 2', status: 'completed' },
                                { name: 'test task 3', status: 'overdue' },
                            ]}
                        />
                    </Col>
                    <Col xs={12}>
                        <Projects className={`${className}__project`} listProject={projects} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Home
