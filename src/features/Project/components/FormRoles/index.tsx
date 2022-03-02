import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import projectsApi from '../../../../api/projectsApi'
import { classProject } from '../../../../constants/className'
import { CONTENT_PROJECT } from '../../../../constants/global'
import { openNotificationWithIcon } from '../../../../functions/global'
import { Role } from '../../../../types/global'
import InputName from './InputName'
import Roles from './Roles'
import SelectPermission from './SelectPermission'

type IProps = {}

const content = CONTENT_PROJECT.formRoles
const className = classProject.roles

function FormRoles(props: IProps) {
    const params: any = useParams()

    const [dataAddRole, setDataAddRole] = useState<any>({ name: '', permission: [] })
    const [roles, setRoles] = useState<Array<Role>>([])

    const getRoles = async (id: string) => {
        try {
            const response = await projectsApi.getRoles(id)
            setRoles(response)
        } catch (error: any) {
            console.log(error)
        }
    }

    const postRoles = async (id: string, data: any) => {
        try {
            const response = await projectsApi.postRoles(id, data)
            console.log(response)

            if (response) {
                getRoles(id)
                setDataAddRole({ name: '', permission: [] })
                openNotificationWithIcon('success', 'Add role successfully!', '')
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const deleteRoles = async (pid: string, id: string) => {
        try {
            const response = await projectsApi.deleteRoles(pid, id)
            getRoles(pid)
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleSubmit = () => postRoles(params.id, dataAddRole)
    const handleDelete = (value: Role) => {
        deleteRoles(value.project || '', value._id || '')
    }

    useEffect(() => {
        getRoles(params.id)
    }, [params])

    return (
        <Row>
            <Col xs={24}>
                <InputName
                    className={`${className}-field`}
                    name={'name'}
                    label={'Name Role *'}
                    value={dataAddRole}
                    onChange={(value: string) => setDataAddRole({ ...dataAddRole, name: value })}
                />
                <SelectPermission
                    options={content.optionsPermission}
                    className={`${className}-field`}
                    label={'Permission'}
                    value={dataAddRole}
                    onChange={(value: any) => setDataAddRole({ ...dataAddRole, permission: value })}
                />

                <Row align={'middle'} justify={'center'} onClick={handleSubmit}>
                    <button type={'submit'} className={`${className}-btn`}>
                        {content.btnSubmit}
                    </button>
                </Row>
            </Col>

            <Col xs={24}>
                <Roles
                    className={`${className}-list`}
                    roles={roles}
                    icon={content.iconDeleteRole}
                    handleDelete={handleDelete}
                />
            </Col>
        </Row>
    )
}

export default FormRoles
