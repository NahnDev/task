import React from 'react'
import { IMessage } from '../../../interfaces/message.interface'

export default function TextMessage(prop: { text: string }) {
    return <div className="TextMessage">{prop.text}</div>
}
