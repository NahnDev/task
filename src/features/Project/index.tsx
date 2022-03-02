import { Col, Row } from 'antd'
import { Formik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import projectsApi from '../../api/projectsApi'
import { add } from '../../app/projectSlice'
import DrawerCustom from '../../components/DrawerCustom'
import Header from '../../components/Header'
import ModalCustom from '../../components/ModalCustom'
import { classLayout, classProject } from '../../constants/className'
import { CONTENT_PROJECT } from '../../constants/global'
import {
    initialValuesFormProjectAddTask,
    initialValuesFormProjectMember,
} from '../../constants/initialValues'
import { validateFormProjectAddTask, validateFormProjectMember } from '../../constants/validate'
import { openNotificationWithIcon } from '../../functions/global'
import { Project, Task } from '../../types/global'
import FormMember from './components/FormMember'
import FormRoles from './components/FormRoles'
import FormTask from './components/FormTask'
import TaskDetail from './components/TaskDetail'
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
    const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false)
    const [contentModal, setContentModal] = useState<any>(<></>)
    const [contentDrawer, setContentDrawer] = useState<any>(<></>)

    const projects: Array<Project> = useSelector((state: any) => state.projects)
    const project: Project = useSelector((state: any) => state.project)

    const [tasks, setTasks] = useState<Array<Task>>([])

    const getProject = async (pid: string) => {
        try {
            const response = await projectsApi.getProjectsDetail(pid)
            dispatch(add(response))
            getTasks(pid)
        } catch (error: any) {
            console.log(error)
        }
    }

    const getTasks = async (pid: string) => {
        try {
            const response: Array<Task> = await projectsApi.getTasks(pid)
            setTasks(response)
        } catch (error: any) {
            console.log(error)
        }
    }

    const postTask = async (pid: string, data: Task) => {
        try {
            const formData = {
                name: data.name,
            }
            const response_post: Task = await projectsApi.postTasks(pid, formData)
            const idTask = response_post._id || ''

            if (data.assignee && response_post) {
                for (const value of data.assignee) {
                    const response_assignee: Task = await projectsApi.postAssigneeTasks(
                        pid,
                        idTask,
                        { member: value }
                    )
                }

                delete data.assignee
            }

            if (data && response_post) {
                data.expires = Number(moment(data.expires).utc().format('x'))

                const response_patch: Task = await projectsApi.patchTasks(pid, idTask, data)

                if (response_patch) {
                    setVisible(false)
                    getProject(pid)
                    openNotificationWithIcon('success', 'Create Task successfully!', '')
                }
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleSubmit = (value: any, action: string, filter?: string) => {
        switch (action) {
            case 'add-task':
                postTask(project._id, { ...value, status: filter })
                break

            default:
                break
        }
    }

    const handleActionDropdown = (value: any, filter?: string) => {
        let temp = <></>
        let title = ''

        setVisible(true)

        switch (value) {
            case 'add-task':
                temp = (
                    <Formik
                        initialValues={initialValuesFormProjectAddTask}
                        validationSchema={validateFormProjectAddTask}
                        onSubmit={(valueForm) => handleSubmit(valueForm, value, filter)}
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
            case 'add-roles':
                temp = (
                    <Formik
                        initialValues={initialValuesFormProjectMember}
                        validationSchema={validateFormProjectMember}
                        onSubmit={(valueForm) => handleSubmit(valueForm, value)}
                        render={FormRoles}
                    />
                )
                title = 'Add Roles'

                break
            default:
                break
        }

        setContentModal({ temp: temp, title: title })
    }

    const handleTask = (value: Task, icon: string) => {
        setVisibleDrawer(true)
        setContentDrawer(
            <TaskDetail
                task={value}
                icon={icon}
                changeTask={() => {
                    getTasks(params.id)
                }}
                memberProject={project.members}
            />
        )
    }

    useEffect(() => {
        if (projects && projects.length > 0) {
            projects.forEach((value) => {
                if (value._id === params.id) {
                    getTasks(value._id)
                    dispatch(add(value))
                }
            })
        } else {
            getProject(params.id)
        }
    }, [params])

    useEffect(() => {
        if (!visible) setContentModal({ temp: <></>, title: '' })
    }, [visible])

    return (
        <Row className={`${props.className} ${className}`}>
            <Col xs={24}>
                <Header
                    className={classLayout.header}
                    dropdown={project.name}
                    actionDropdown={handleActionDropdown}
                />
                <div className={`${className}__list`}>
                    <div className={`${className}__list--scroll`}>
                        {content.tasks.filter.map((value, index) => {
                            return (
                                <Tasks
                                    key={`tasks-${index}`}
                                    actionDropdown={(valueTask: any) =>
                                        handleActionDropdown(valueTask, value.value)
                                    }
                                    className={`${className}__list-tasks`}
                                    title={value.title}
                                    tasks={tasks}
                                    filter={value.value}
                                    icon={value.icon}
                                    handleTask={handleTask}
                                />
                            )
                        })}
                    </div>
                </div>
                <ModalCustom
                    loading={false}
                    contentModal={contentModal.temp}
                    visible={visible}
                    closeModal={(value: boolean) => {
                        setVisible(value)
                    }}
                    title={contentModal.title}
                />

                <DrawerCustom
                    visible={visibleDrawer}
                    closeModal={() => setVisibleDrawer(false)}
                    contentDrawer={contentDrawer}
                />
            </Col>
        </Row>
    )
}

export default ProjectPage
