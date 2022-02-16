import { Avatar, Col, Dropdown, Menu, Row } from 'antd'
import { User } from '../../../../types/global'
import { PlusOutlined } from '@ant-design/icons'

type IProps = {
    className: string
    user: User
}

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        </Menu.Item>
    </Menu>
)

function UserDetail(props: IProps) {
    const name = props.user.name

    return (
        <Row align="middle">
            <Dropdown overlay={menu} placement="bottomRight" arrow>
                <button className={`${props.className}--btn`}>
                    <PlusOutlined />
                </button>
            </Dropdown>
            <Col className={`${props.className}--name`}>
                <span>{props.user.name}</span>
            </Col>
            <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow
                className={`${props.className}--avatar`}
            >
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    {name?.slice(name?.indexOf(' ') + 1, name?.indexOf(' ') + 2)}
                </Avatar>
            </Dropdown>
        </Row>
    )
}

export default UserDetail
