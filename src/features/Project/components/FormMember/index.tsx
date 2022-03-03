import { Avatar, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import projectsApi from '../../../../api/projectsApi'
import userApi from '../../../../api/userApi'
import { addMember } from '../../../../app/projectSlice'
import Search from '../../../../components/Search'
import { classProject } from '../../../../constants/className'
import { CONTENT_PROJECT } from '../../../../constants/global'
import { openNotificationWithIcon, randomColorAvatar } from '../../../../functions/global'
import { DataMembers } from '../../../../types/api'
import { Member, Project, User } from '../../../../types/global'

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
            setUserSearch([])
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleSearch = (value: string) => {
        value && findUser(value)
    }

    const handleAddMember = (value: any) => {
        const data: DataMembers = {
            user: value,
        }

        postMember(project._id, data)
    }

    return (
        <Row>
            <Col xs={12} className={`${className}-search`}>
                <Search onSearch={handleSearch} />

                {userSearch && userSearch.length > 0 && (
                    <Row align="middle" className={`${className}-item`}>
                        <Col xs={6} className={`${className}-item--avatar`}>
                            <Avatar
                                shape="square"
                                size={55}
                                style={{
                                    backgroundColor: randomColorAvatar(userSearch[0]._id),
                                    borderRadius: 15,
                                }}
                            >
                                {userSearch[0].name?.slice(0, 1)}
                            </Avatar>
                        </Col>

                        <Col xs={16} className={`${className}-item--desc`}>
                            <span>{userSearch[0].name}</span>
                            <span>{userSearch[0].email}</span>
                        </Col>

                        <Col xs={2}>
                            <button
                                onClick={() => handleAddMember(userSearch[0]._id)}
                                className={`${className}-btn`}
                            >
                                <content.btnSubmit />
                            </button>
                        </Col>
                    </Row>
                )}
            </Col>

            <Col xs={12} className={`${className}-list`}>
                {project.members.map((value, index) => {
                    return (
                        <Row
                            align="middle"
                            className={`${className}-item`}
                            key={`member-project-${index}`}
                        >
                            <Col xs={6} className={`${className}-item--avatar`}>
                                <Avatar
                                    shape="square"
                                    size={55}
                                    style={{
                                        backgroundColor: randomColorAvatar(value.user._id),
                                        borderRadius: 15,
                                    }}
                                >
                                    {value.user.name?.slice(0, 1)}
                                </Avatar>
                            </Col>

                            <Col xs={16} className={`${className}-item--desc`}>
                                <span>{value.user.name}</span>
                                <span>{value.user.email}</span>
                            </Col>

                            <Col xs={2}>
                                <button className={`${className}-item--btn`}>
                                    <content.btnDelete />
                                </button>
                            </Col>
                        </Row>
                    )
                })}
            </Col>
        </Row>
    )
}

export default FormMember
