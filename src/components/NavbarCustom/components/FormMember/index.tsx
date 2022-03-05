import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import projectsApi from '../../../../api/projectsApi'
import userApi from '../../../../api/userApi'
import { addMember, deleteMember } from '../../../../app/projectSlice'
import { addMemberToProject, deleteMemberToProject } from '../../../../app/projectsSlice'
import Search from '../../../../components/Search'
import { classProject } from '../../../../constants/className'
import { openNotificationWithIcon } from '../../../../functions/global'
import { DataMembers } from '../../../../types/api'
import { Member, Project, User } from '../../../../types/global'
import MemberItem from './Member'

type IProps = {
    pid: string
}

const className = classProject.member

function FormMember(props: IProps) {
    const dispatch = useDispatch()

    const [userSearch, setUserSearch] = useState<Array<User>>()
    const [project, setProject] = useState<Project>()
    const findUser = async (mail: string) => {
        try {
            const response: Array<User> = await userApi.getUser(mail)

            if (response.length === 0) openNotificationWithIcon('warning', "Can't find user!", '')

            setUserSearch(response)
        } catch (error: any) {
            console.log(error)
        }
    }

    const postMember = async (pid: string, data: DataMembers) => {
        try {
            const response: Member = await projectsApi.postMembers(pid, data)
            dispatch(addMember(response))
            dispatch(addMemberToProject({ _pid: pid, value: response }))
            getProjectDetail(pid)
            setUserSearch([])
        } catch (error: any) {
            console.log(error)
        }
    }

    const deleteMemberAPI = async (pid: string, uid: string) => {
        try {
            const response = await projectsApi.deleteMembers(pid, uid)
            dispatch(deleteMember(uid))
            dispatch(deleteMemberToProject({ _pid: pid, value: uid }))
            getProjectDetail(pid)
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleSearch = (value: string) => {
        value && findUser(value)
    }

    const handleMember = (value: any, type: 'add' | 'delete') => {
        if (type === 'delete') {
            project && deleteMemberAPI(project._id, value)
        } else {
            const data: DataMembers = {
                user: value,
            }
            project && postMember(project._id, data)
        }
    }

    const getProjectDetail = async (_pid: string) => {
        try {
            const response = await projectsApi.getProjectsDetail(_pid)
            setProject(response)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProjectDetail(props.pid)
    }, [props.pid])

    return (
        <Row>
            <Col xs={12} className={`${className}-search`}>
                <Search onSearch={handleSearch} />
                <Row>
                    <Col xs={24} className={`${className}-list`}>
                        {userSearch &&
                            userSearch.length > 0 &&
                            userSearch.map((value, index) => {
                                return (
                                    <MemberItem
                                        key={`member-project-${index}`}
                                        className={`${className}`}
                                        value={value}
                                        type={'add'}
                                        handleMember={handleMember}
                                    />
                                )
                            })}
                    </Col>
                </Row>
            </Col>

            <Col xs={12} className={`${className}-list`}>
                {project &&
                    project.members.map((value, index) => {
                        return (
                            <MemberItem
                                key={`member-project-${index}`}
                                className={`${className}`}
                                value={value.user}
                                type={'delete'}
                                handleMember={handleMember}
                            />
                        )
                    })}
            </Col>
        </Row>
    )
}

export default FormMember
