import { Avatar, Col, Row } from 'antd'
import { randomColorAvatar } from '../../../../../functions/global'
import { User } from '../../../../../types/global'

type IProps = {
    value: User

    className: string
}

function MemberItem(props: IProps) {
    const { className, value } = props

    return (
        <Row align="middle" className={`${className}-item`}>
            <Col xs={6} className={`${className}-item--avatar`}>
                <Avatar
                    shape="square"
                    size={55}
                    style={{
                        backgroundColor: randomColorAvatar(value._id),
                        borderRadius: 15,
                    }}
                >
                    {value.name?.slice(0, 1)}
                </Avatar>
            </Col>

            <Col xs={18} className={`${className}-item--desc`}>
                <span>{value.name}</span>
                <span>{value.email}</span>
            </Col>
        </Row>
    )
}

export default MemberItem
