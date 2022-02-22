import { Col, Row } from 'antd'
import { Formik } from 'formik'
import { useState, useEffect } from 'react'
import projectApi from '../../api/projectsApi'

import { useNavigate } from 'react-router-dom'

import Header from '../../components/Header'
import ModalCustom from '../../components/ModalProject'
import { classHome, classLayout } from '../../constants/className'
import { CONTENT_HOME } from '../../constants/global'
import { initialValuesFormHomeProject } from '../../constants/initialValues'
import { validateFormHomeProject } from '../../constants/validate'
import { openNotificationWithIcon } from '../../functions/global'
import { DataProject } from '../../types/api'
import Description from './components/Description'
import FormProject from './components/FormProject'
import Priorities from './components/Priorities'
import Projects from './components/Projects'

import './Home.scss'
import { useDispatch } from 'react-redux'
import { add, list } from '../../app/projectsSlice'

type Home = {
    className: string
}

const content = CONTENT_HOME
const className = classHome.home

function Home(props: Home) {
    const [visible, setVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const nav = useNavigate()
    const dispatch = useDispatch()

    const getProjects = async () => {
        try {
            const response = await projectApi.getProjects()
            dispatch(list(response))
        } catch (error: any) {
            console.log(error)
        }
    }

    const postProjects = async (formData: DataProject) => {
        try {
            setLoading(true)
            const response: any = await projectApi.postProjects(formData)
            if (response) {
                setLoading(false)
                setVisible(false)
                openNotificationWithIcon('success', 'Create project successfully!', '')
                getProjects()
                nav(`/project/${response._id}`)
            }

            console.log(response)
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleSubmit = (value: DataProject) => postProjects(value)

    const contentModal = (
        <Formik
            initialValues={initialValuesFormHomeProject}
            validationSchema={validateFormHomeProject}
            onSubmit={handleSubmit}
            render={FormProject}
        />
    )

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <Row className={`${props.className} ${className}`}>
            <Col xs={24}>
                <Header className={classLayout.header} title={content.title} />
                <Description className={`${className}__desc`} />
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
                        <Projects
                            onClickAddProject={() => setVisible(!visible)}
                            className={`${className}__project`}
                        />
                    </Col>
                </Row>
                <ModalCustom
                    loading={loading}
                    contentModal={contentModal}
                    visible={visible}
                    closeModal={(value: boolean) => setVisible(value)}
                    title={content.formProject.title}
                />
            </Col>
        </Row>
    )
}

export default Home