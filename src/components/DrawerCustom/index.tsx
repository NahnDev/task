import { Drawer } from 'antd'
import { useEffect } from 'react'

import './DrawerCustom.scss'

type IProps = {
    visible: boolean

    closeModal: Function
    title?: string

    contentDrawer: any
}

function DrawerCustom(props: IProps) {
    useEffect(() => {}, [props.visible])

    return (
        <Drawer
            title={props.title || false}
            placement="right"
            width={550}
            onClose={() => props.closeModal()}
            visible={props.visible}
            getContainer={false}
            closable={false}
        >
            {props.contentDrawer}
        </Drawer>
    )
}

export default DrawerCustom
