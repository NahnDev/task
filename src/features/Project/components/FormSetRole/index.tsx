import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import projectsApi from '../../../../api/projectsApi'
import { classProject } from '../../../../constants/className'
import { DataMembers } from '../../../../types/api'
import { Project, Role } from '../../../../types/global'
import MemberItem from './Member'
import SelectPermission from './SelectPermission'

type IProps = {}

const className = classProject.setRoles

function FormSetRole(props: IProps) {
    const params: any = useParams()
    const project: Project = useSelector((state: any) => state.project)

    const [roles, setRoles] = useState<Array<Role>>([])

    const getRoles = async (id: string) => {
        try {
            const response = await projectsApi.getRoles(id)
            setRoles(response)
        } catch (error: any) {
            console.log(error)
        }
    }

    const patchRole = async (pid: string, uid: string, data: DataMembers) => {
        try {
            const response = await projectsApi.patchMembers(pid, uid, data)
            console.log(response)
            getRoles(pid)
        } catch (error: any) {
            console.log(error)
        }
    }

    const setRoleForMember = (value: any, uid: string) => {
        patchRole(project._id, uid, { role: value })
    }

    useEffect(() => {
        getRoles(params.id)
    }, [params])

    return (
        <Row>
            <Col xs={24} className={`${className}`}>
                {project &&
                    project.members.map((value, index) => {
                        if (project.author !== value.user._id)
                            return (
                                <Row
                                    key={`member-role-${index}`}
                                    align="middle"
                                    className={`${className}-item`}
                                >
                                    <MemberItem
                                        value={value.user}
                                        className={`${className}--member`}
                                    />
                                    <SelectPermission
                                        options={roles}
                                        className={`${className}--field`}
                                        label={'Role'}
                                        value={value.role}
                                        onChange={(valueSelect: any) =>
                                            setRoleForMember(valueSelect, value.user._id)
                                        }
                                    />
                                </Row>
                            )
                    })}
            </Col>
        </Row>
    )
}

export default FormSetRole
