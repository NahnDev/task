import { List } from 'antd'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { messages as messagesSeed } from '../seed'
import Message from './Message'
import { useInView } from 'react-intersection-observer'

const styles: { [key: string]: CSSProperties } = {
    root: {
        padding: '2em 1em',
        height: '100%',
        overflow: 'auto',
    },
    item: {
        borderBottomWidth: 0,
    },
}
export default function MessageList(prop: { style?: CSSProperties; className?: string }) {
    const { ref: autoRef, inView: isAutoScroll } = useInView({ threshold: 0 })
    const { ref: loadRef, inView: loadMore } = useInView({ threshold: 0 })
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState(
        Object.keys(messagesSeed).map((key) => messagesSeed[key])
    )

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isAutoScroll) {
            ref.current?.scrollTo({ top: ref.current?.clientHeight })
            console.log('bat auto scroll')
        } else {
            console.log('tat auto scroll')
        }
    }, [isAutoScroll])
    useEffect(() => {
        // messageArr updated
        console.log('messageArr update')
        setLoading(false)
    }, [messages])
    useEffect(() => {
        if (loadMore && !loading) {
            // goi api load them du lieu
            console.log('load them du lieu')
            setLoading(true)
        }
    }, [loadMore, loading])
    useEffect(() => {})
    return (
        <div className="MessageList" ref={ref} style={styles.root}>
            <List>
                <div ref={loadRef}>{loading ? '' : 'Loading'}</div>
                {messages.map((message) => (
                    <List.Item style={styles.item} key={message._id}>
                        <Message message={message}></Message>
                    </List.Item>
                ))}
                <div ref={autoRef}>Active auto load</div>
            </List>
        </div>
    )
}
