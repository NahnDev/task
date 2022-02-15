import React from 'react';
import { MessageType } from '../../../types/message.type';

export default function TextMessage(prop: { text: string }) {
    return <div className="TextMessage">{prop.text}</div>;
}
