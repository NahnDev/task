import { Avatar, Col, Row } from 'antd'
import { CONTENT_PROJECT } from '../../../../../constants/global'
import { randomColorAvatar } from '../../../../../functions/global'
import { User } from '../../../../../types/global'

type IProps = {
    projectAuthor: string
    value: User
    type: 'add' | 'delete'
    handleMember: Function

    className: string
}

const content = CONTENT_PROJECT.formMember

function MemberItem(props: IProps) {
    const { className, value, type, handleMember, projectAuthor } = props

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

            <Col xs={16} className={`${className}-item--desc`}>
                <span>{value.name}</span>
                <span>{value.email}</span>
            </Col>

            {projectAuthor !== value._id && (
                <Col xs={2}>
                    <button
                        onClick={() => handleMember(value._id, type)}
                        className={`${className}-btn`}
                    >
                        {type === 'add' ? <content.btnSubmit /> : <content.btnDelete />}
                    </button>
                </Col>
            )}
        </Row>
    )
}

export default MemberItem
