import { notification } from 'antd'
// import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

export const openNotificationWithIcon = (
    type: 'success' | 'warning',
    message: string,
    err: string
) => {
    if (type === 'success' || type === 'warning')
        notification[type]({ top: 75, message: message, description: err })
    return
}
