import { notification } from 'antd'
import { listColorRandom } from '../constants/global'

export const openNotificationWithIcon = (
    type: 'success' | 'warning',
    message: string,
    err: string
) => {
    if (type === 'success' || type === 'warning')
        notification[type]({ top: 75, message: message, description: err })
    return
}

export const randomColorAvatar = (_id: string) => {
    let color = '#29339B'
    const keyRandom = _id.slice(_id.length - 1, _id.length)

    listColorRandom.map((value) => {
        if (keyRandom.charCodeAt(0) % 10 === value.key) {
            color = value.value
        }
    })

    return color
}
