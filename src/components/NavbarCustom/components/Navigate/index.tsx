import { Col, Row } from 'antd'
import { NavLink } from 'react-router-dom'
import { CONTENT_COMPONENT } from '../../../../constants/global'

type TProps = {
    className: string
}

const content = CONTENT_COMPONENT.navbarCustom.navigate

function Navigate(props: TProps) {
    return (
        <Row justify="center" className={`${props.className}`}>
            <Col xs={24}>
                {content &&
                    content.length > 0 &&
                    content.map((value, index) => {
                        return (
                            <Row key={index}>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${props.className}--link active`
                                            : `${props.className}--link`
                                    }
                                    to={value.path}
                                >
                                    <span className={`${props.className}--icon`}>
                                        <value.icon />
                                    </span>
                                    <span className={`${props.className}--text`}>{value.text}</span>
                                </NavLink>
                            </Row>
                        )
                    })}
            </Col>
        </Row>
    )
}

export default Navigate
