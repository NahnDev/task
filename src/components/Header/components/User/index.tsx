import { Avatar, Col, Dropdown, Menu, Row } from 'antd'
import { User } from '../../../../types/global'
import { PlusOutlined } from '@ant-design/icons'
import { randomColorAvatar } from '../../../../functions/global'

type IProps = {
    className: string
    user: User

    menuUser: any
}

function UserDetail(props: IProps) {
    const name = props.user.name

    return (
        <Row align="middle">
            <Col className={`${props.className}--name`}>
                <span>{props.user.name}</span>
            </Col>
            <Dropdown
                overlay={props.menuUser}
                placement="bottomRight"
                arrow
                className={`${props.className}--avatar`}
            >
                <Avatar style={{ backgroundColor: randomColorAvatar(props.user._id) }}>
                    {name?.slice(name?.indexOf(' ') + 1, name?.indexOf(' ') + 2)}
                </Avatar>
            </Dropdown>
        </Row>
    )
}

export default UserDetail
