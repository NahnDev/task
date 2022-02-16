import { Modal, Spin } from 'antd'
import { useEffect } from 'react'

import './ModalCustom.scss'

type IProps = {
    visible: boolean
    loading: boolean

    closeModal: Function
    title: string

    contentModal: any
}

function ModalCustom(props: IProps) {
    useEffect(() => {}, [props.visible])

    return (
        <Modal
            title={props.title}
            visible={props.visible}
            onOk={() => props.closeModal(false)}
            onCancel={() => props.closeModal(false)}
            footer={null}
            width={600}
        >
            <Spin spinning={props.loading}>{props.contentModal}</Spin>
        </Modal>
    )
}

export default ModalCustom
