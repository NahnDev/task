import { Avatar, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import projectsApi from '../../../../api/projectsApi'
import userApi from '../../../../api/userApi'
import { addMember, deleteMember } from '../../../../app/projectSlice'
import { addMemberToProject, deleteMemberToProject } from '../../../../app/projectsSlice'
import Search from '../../../../components/Search'
import { classProject } from '../../../../constants/className'
import { CONTENT_PROJECT } from '../../../../constants/global'
import { openNotificationWithIcon, randomColorAvatar } from '../../../../functions/global'
import { DataMembers } from '../../../../types/api'
import { Member, Project, User } from '../../../../types/global'
import MemberItem from './Member'

type IProps = {}

const content = CONTENT_PROJECT.formMember
const className = classProject.member

function FormMember(props: IProps) {
    const dispatch = useDispatch()
    const project: Project = useSelector((state: any) => state.project)

    const [userSearch, setUserSearch] = useState<Array<User>>()
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
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleSearch = (value: string) => {
        value && findUser(value)
    }

    const handleMember = (value: any, type: 'add' | 'delete') => {
        if (type === 'delete') {
            deleteMemberAPI(project._id, value)
        } else {
            const data: DataMembers = {
                user: value,
            }
            postMember(project._id, data)
        }
    }

    return (
        <Row>
            <Col xs={12} className={`${className}-search`}>
                <Search onSearch={handleSearch} />

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

            <Col xs={12} className={`${className}-list`}>
                {project.members.map((value, index) => {
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
