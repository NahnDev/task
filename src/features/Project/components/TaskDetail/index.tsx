import { Col, Row } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import projectsApi from '../../../../api/projectsApi'
import { classProject } from '../../../../constants/className'
import { initialValuesFormProjectAddSubTask } from '../../../../constants/initialValues'
import { openNotificationWithIcon } from '../../../../functions/global'
import { Task } from '../../../../types/global'
import DateTask from './DateTask'
import HeaderTask from './Header'
import SelectTask from './SelectTask'
import SubTask from './SubTask'
import TextAreaTask from './TextAreaTask'

type IProps = {
    task: Task
    icon: string

    changeTask: Function
    memberProject: Array<any>
}

const className = classProject.task

function TaskDetail(props: IProps) {
    const params: any = useParams()
    const [task, setTask] = useState<Task>(props.task)

    const getTask = async (pid: string, id: string) => {
        try {
            const response: Task = await projectsApi.getTasksDetail(pid, id)
            setTask(response)
        } catch (error: any) {
            console.log(error)
        }
    }

    const patchTask = async (pid: string, id: string, data: Task) => {
        try {
            const response: Task = await projectsApi.patchTasks(pid, id, data)
            if (response) {
                props.changeTask()
                getTask(pid, id)
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const patchSubTask = async (pid: string, id: string, status: string) => {
        try {
            if (status === 'complete') {
                const response: Task = await projectsApi.patchTasksComplete(pid, id)
                openNotificationWithIcon('success', 'Task complete!', '')
            } else {
                const response = await projectsApi.deleteTasks(pid, id)
                openNotificationWithIcon('success', 'Delete Task successfully!', '')
            }
            props.changeTask()
            getTask(pid, task._id || '')
        } catch (error: any) {
            console.log(error)
        }
    }

    const postSubTask = async (pid: string, id: string, data: Task) => {
        try {
            const response: Task = await projectsApi.postSubtasks(pid, id, data)

            if (response) {
                props.changeTask()
                getTask(pid, id)
                openNotificationWithIcon('success', 'Create Subtask successfully!', '')
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const postAssignee = async (pid: string, id: string, data: { member: string }) => {
        try {
            const response: Task = await projectsApi.postAssigneeTasks(pid, id, data)
            if (response) {
                props.changeTask()
                getTask(pid, id)
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const deleteAssignee = async (pid: string, id: string, uid: string) => {
        try {
            const response = await projectsApi.deleteAssigneeTasks(pid, id, uid)
        } catch (error: any) {
            console.log(error)
        }
    }
    const change = (value: any, field: any, status?: string) => {
        const id = props.task._id || ''

        if (value) {
            let data: any = {}
            switch (field) {
                case 'name':
                    data.name = value
                    patchTask(params.id, id, data)
                    break
                case 'assignee':
                    if (status === 'delete') {
                        deleteAssignee(params.id, id, value)
                    }
                    if (status === 'add') {
                        for (const assignee of value) {
                            postAssignee(params.id, id, { member: assignee })
                        }
                    }
                    break
                case 'expires':
                    data.expires = Number(moment(value).utc().format('x'))
                    patchTask(params.id, id, data)
                    break
                default:
                    break
            }
        }
    }

    const handleSubTask = (value: Task) => {
        const id = props.task._id || ''
        postSubTask(params.id, id, value)
    }

    const handleChangeSubtask = (value: any, status: string) => {
        patchSubTask(params.id, value._id, status)
    }

    useEffect(() => {
        setTask(props.task)
    }, [props.task])

    return (
        <Row>
            <Col xs={24}>
                <HeaderTask
                    className={`${className}-header`}
                    icon={props.icon}
                    task={task}
                    changeName={change}
                />
                <SelectTask
                    className={`${className}-field`}
                    task={task}
                    label={'Assignee'}
                    changeAssignee={change}
                />
                <DateTask
                    className={`${className}-field`}
                    task={task}
                    label={'Due date'}
                    name={'expires'}
                    changeExpires={change}
                />

                <TextAreaTask
                    className={`${className}-field`}
                    task={task}
                    label={'Description'}
                    name={'expires'}
                    changeDescription={(value: any) => console.log(value)}
                />

                <SubTask
                    className={`${className}-subtask`}
                    task={task}
                    icon={props.icon}
                    handleSubmit={handleSubTask}
                    handleChangeSubtask={handleChangeSubtask}
                />
            </Col>
        </Row>
    )
}

export default TaskDetail
