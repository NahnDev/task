import { Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { classComponent } from '../../constants/className'

import './Search.scss'
import { useState } from 'react'

type IProps = {
    onSearch: Function
}

const className = classComponent.search

function Search(props: IProps) {
    const [value, setValue] = useState<string>('')
    return (
        <Row className={`${className}`} align="middle">
            <span className={`${className}__icon`}>
                <SearchOutlined />
            </span>
            <input
                type="text"
                placeholder="Search"
                className={`${className}__input`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        setValue('')
                        props.onSearch(value)
                    }
                }}
                onBlur={() => {
                    setValue('')
                    props.onSearch(value)
                }}
            />
        </Row>
    )
}

export default Search
