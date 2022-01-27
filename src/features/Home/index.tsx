import { Row } from 'antd'
import React from 'react'

type Home = {
    className: string
}

function Home(props: Home) {
    return (
        <Row className={props.className}>
            <div>Home</div>
        </Row>
    )
}

export default Home
