import { List } from 'antd';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import MessageItem from './MessageItem';
import { useInView } from 'react-intersection-observer';
import { RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { MessageType } from '../../../types/message.type';
import { MessageApi } from '../../../api/message.api';
import { MessageAction } from '../../../app/message/message.ations';
import { UserType } from '../../../types/user.type';

const styles: { [key: string]: CSSProperties } = {
    root: {
        padding: '2em 1em',
        height: '100%',
        overflow: 'auto',
    },
    item: {
        borderBottomWidth: 0,
    },
};
export default function MessageList(prop: {
    style?: CSSProperties;
    className?: string;
    rId: string;
}) {
    const messages = useSelector<RootState, MessageType[]>((state) => state.message[prop.rId]);
    const [height, setHeight] = useState<number>(0);
    const [autoScroll, setAutoScroll] = useState(true);
    const { ref: autoRef, inView: isAutoScroll } = useInView({ threshold: 0 });
    const { ref: loadRef, inView: loadMore } = useInView({ threshold: 0 });
    const [loadable, setLoadable] = useState(true);
    const [more, setMore] = useState(true);
    const dispatch = useDispatch();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (autoScroll) {
            ref.current?.scrollTo({ top: ref.current?.scrollHeight });
            console.log('auto scroll');
        } else {
            ref.current?.scrollTo({ top: ref.current?.scrollHeight - height });
            console.log(ref.current?.scrollHeight || 0);
            setHeight(ref.current?.scrollHeight || 0);
        }
    }, [messages]);
    useEffect(() => {
        if (isAutoScroll) {
            setAutoScroll(true);
        } else {
            setAutoScroll(false);
        }
    }, [isAutoScroll]);
    useEffect(() => {
        console.log('Cap nhat tin nhan!');
        if (!messages) return;
        setTimeout(() => {
            setLoadable(true);
        }, 250);
    }, [messages]);
    useEffect(() => {
        if (loadMore && loadable) {
            dispatch(MessageAction.loadMessage(prop.rId));
            setTimeout(() => setLoadable(true), 200);
        }
    }, [loadMore, loadable]);
    useEffect(() => {
        dispatch(MessageAction.loadMessage(prop.rId));
        setTimeout(() => setLoadable(true), 200);
    });

    return (
        <div className="MessageList" ref={ref} style={styles.root}>
            <List>
                <div ref={loadRef}>{loadable ? '' : 'Loading'}</div>
                {(messages || []).map((message) => (
                    <List.Item style={styles.item} key={message._id}>
                        <MessageItem message={message}></MessageItem>
                    </List.Item>
                ))}
                <div ref={autoRef}></div>
            </List>
        </div>
    );
}
