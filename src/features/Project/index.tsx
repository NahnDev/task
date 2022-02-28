import { Col, Row } from 'antd'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import projectsApi from '../../api/projectsApi'
import { add } from '../../app/projectSlice'
import Header from '../../components/Header'
import ModalCustom from '../../components/ModalProject'
import { classLayout, classProject } from '../../constants/className'
import { CONTENT_PROJECT } from '../../constants/global'
import {
    initialValuesFormProjectAddTask,
    initialValuesFormProjectMember,
} from '../../constants/initialValues'
import { validateFormProjectAddTask, validateFormProjectMember } from '../../constants/validate'
import { openNotificationWithIcon } from '../../functions/global'
import { DataTasks } from '../../types/api'
import { Project } from '../../types/global'
import FormMember from './components/FormMember'
import FormTask from './components/FormTask'
import Tasks from './components/Tasks'

import './Project.scss'

type IProps = {
    className: string
}

const content = CONTENT_PROJECT
const className = classProject.project

function ProjectPage(props: IProps) {
    const params: any = useParams()
    const dispatch = useDispatch()

    const [visible, setVisible] = useState<boolean>(false)
    const [contentModal, setContentModal] = useState<any>(<></>)

    const projects: Array<Project> = useSelector((state: any) => state.projects)
    const project: Project = useSelector((state: any) => state.project)

    const getProject = async (pid: string) => {
        try {
            const response = await projectsApi.getProjectsDetail(pid)
            dispatch(add(response))
        } catch (error: any) {
            console.log(error)
        }
    }

    const postTask = async (pid: string, data: DataTasks) => {
        try {
            const response: DataTasks = await projectsApi.postTasks(pid, data)

            console.log(response)

            if (response) {
                setVisible(false)
                openNotificationWithIcon('success', 'Create Task successfully!', '')
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleSubmit = (value: any, action: string) => {
        switch (action) {
            case 'add-task':
                postTask(project._id, value)
                break

            default:
                break
        }
    }

    const handleActionDropdown = (value: any) => {
        let temp = <></>
        let title = ''

        setVisible(true)

        switch (value) {
            case 'add-task':
                temp = (
                    <Formik
                        initialValues={initialValuesFormProjectAddTask}
                        validationSchema={validateFormProjectAddTask}
                        onSubmit={(valueForm) => handleSubmit(valueForm, value)}
                        render={FormTask}
                    />
                )
                title = 'Add Task'
                break

            case 'add-member':
                temp = (
                    <Formik
                        initialValues={initialValuesFormProjectMember}
                        validationSchema={validateFormProjectMember}
                        onSubmit={(valueForm) => handleSubmit(valueForm, value)}
                        render={FormMember}
                    />
                )
                title = 'Add Member'

                break
            default:
                break
        }

        setContentModal({ temp: temp, title: title })
    }

    useEffect(() => {
        if (projects && projects.length > 0) {
            projects.forEach((value) => {
                if (value._id === params.id) dispatch(add(value))
            })
        } else {
            getProject(params.id)
        }
    }, [params])

    return (
        <Row className={`${props.className} ${className}`}>
            <Col xs={24}>
                <Header
                    className={classLayout.header}
                    dropdown={project.name}
                    actionDropdown={handleActionDropdown}
                />
                <Row>
                    <Col xs={8}>
                        <Tasks
                            className={`${className}__listTasks`}
                            title={'To do'}
                            tasks={tasks}
                        />
                    </Col>
                    <Col xs={8}>
                        <Tasks
                            className={`${className}__listTasks`}
                            title={'To do'}
                            tasks={tasks}
                        />
                    </Col>
                    <Col xs={8}>
                        <Tasks
                            className={`${className}__listTasks`}
                            title={'To do'}
                            tasks={tasks}
                        />
                    </Col>
                </Row>
                <ModalCustom
                    loading={false}
                    contentModal={contentModal.temp}
                    visible={visible}
                    closeModal={(value: boolean) => {
                        setVisible(value)
                    }}
                    title={contentModal.title}
                />
            </Col>
        </Row>
    )
}

const tasks = [
    { name: 'Test task 1 Test task 1 Test task 1 Test task 1 Test task 1 Test task 1' },
    { name: 'Test task 2' },
    { name: 'Test task 3' },
    { name: 'Test task 4' },
]

export default ProjectPage
