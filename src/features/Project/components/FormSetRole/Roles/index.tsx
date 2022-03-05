import { Col, Row, Tag } from 'antd'
import { Role } from '../../../../../types/global'

type IProps = {
    className?: string
    icon: any

    roles: Array<Role>
    handleDelete: Function
}

function Roles(props: IProps) {
    return (
        <>
            <Row className={`${props.className}--title`}>
                <span>Roles</span>
            </Row>
            <Row className={`${props.className}`}>
                <Col xs={24}>
                    {props.roles.map((value, index) => {
                        return (
                            <Row
                                key={`role-${index}`}
                                justify="space-between"
                                align="middle"
                                className={`${props.className}--item`}
                            >
                                <div className={`${props.className}--name`}>
                                    <span>{value.name}</span>
                                    <div>
                                        {value.permission.length === 8 ? (
                                            <Tag key={`tag-all`} color="lime">
                                                ALL
                                            </Tag>
                                        ) : (
                                            value.permission.map((value, index) => {
                                                return (
                                                    <Tag
                                                        key={`tag-${index}`}
                                                        color="lime"
                                                        style={{
                                                            marginRight: 3,
                                                            marginBottom: 3,
                                                            fontSize: '0.6rem',
                                                        }}
                                                    >
                                                        {value}
                                                    </Tag>
                                                )
                                            })
                                        )}
                                    </div>
                                </div>
                                {!value.default && (
                                    <button
                                        className={`${props.className}--btn`}
                                        onClick={() => props.handleDelete(value)}
                                    >
                                        <props.icon />
                                    </button>
                                )}
                            </Row>
                        )
                    })}
                </Col>
            </Row>
        </>
    )
}

export default Roles
