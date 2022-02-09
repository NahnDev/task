import { Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { classComponent } from '../../constants/className'

import './Search.scss'

type IProps = {}

const className = classComponent.search

function Search(props: IProps) {
    return (
        <Row className={`${className}`} align="middle">
            <span className={`${className}__icon`}>
                <SearchOutlined />
            </span>
            <input type="text" placeholder="Search" className={`${className}__input`} />
        </Row>
    )
}

export default Search
