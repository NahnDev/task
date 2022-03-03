import { Button, Input } from 'antd';
import React, {
    CSSProperties,
    KeyboardEventHandler,
    useCallback,
    useState,
    KeyboardEvent,
    useRef,
} from 'react';
import {
    PlusCircleOutlined,
    SendOutlined,
    PictureOutlined,
    PaperClipOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { colors } from '../../../styles/chat.style';
import TextArea from 'antd/lib/input/TextArea';
import { useDropzone } from 'react-dropzone';
import UploadFileView from '../upload/UploadFileView';
import { socketClient } from '../../../socket/socket.client';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { UserType } from '../../../types/user.type';

function makeStyles(): {
    button: CSSProperties;
    root: CSSProperties;
    input: { root: CSSProperties; editor: CSSProperties; send: CSSProperties };
} {
    return {
        root: {
            padding: '1em 0.5em',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
        },
        button: {
            background: 'transparent',
            border: 'none',
            outline: 'none',
            borderRadius: '50vh',
            color: colors.text,
            fontSize: '1.5em',
        },
        input: {
            root: {
                background: colors.secondary,
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'end',
                padding: '0.5em 1em',
                borderRadius: '2em',

                width: '100%',
                overflow: 'hidden',
            },
            editor: {
                background: 'transparent',
                border: 0,
                outline: 'none',
                color: colors.text,
                width: '100%',
                overflow: 'hidden',
                resize: 'none',
            },
            send: {
                fontSize: '1.5em',
                padding: '0 0.2em',
            },
        },
    };
}
export default function MessageSender(props: { rId: string }) {
    const styles = makeStyles();
    const user = useSelector<RootState, UserType>((state) => state.user);
    const inputRef = useRef<HTMLDivElement>(null);
    const [onMore, setOnMore] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleOnDrop = useCallback((acceptFiles) => {
        setFiles(acceptFiles);
        console.dir(acceptFiles);
    }, []);
    const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop: handleOnDrop });
    const handleSubmit = function () {
        if (inputRef.current) {
            const value = inputRef.current.innerText || '';
            inputRef.current.textContent = '';
            socketClient.message.sendMessage({
                room: props.rId,
                content: { t: 'text', data: value },
            });
        }
    };

    const handleOpenMore = function () {
        setOnMore(true);
    };
    const handleCloseMore = function () {
        setOnMore(false);
    };
    return (
        <div>
            <UploadFileView files={files}></UploadFileView>
            <div className="MessageSender" style={styles.root}>
                <div style={{ display: 'flex' }}>
                    <div hidden={!onMore}>
                        <Button
                            icon={<PictureOutlined style={{ fontSize: '1em' }} />}
                            style={styles.button}
                        ></Button>
                        <Button
                            icon={<PaperClipOutlined style={{ fontSize: '1em' }} />}
                            style={styles.button}
                        ></Button>
                    </div>
                    {!onMore ? (
                        <Button
                            icon={<PlusCircleOutlined />}
                            style={styles.button}
                            onClick={handleOpenMore}
                        ></Button>
                    ) : (
                        <Button
                            icon={<CloseCircleOutlined />}
                            style={styles.button}
                            onClick={handleCloseMore}
                        ></Button>
                    )}
                </div>
                <div {...getRootProps()} onClick={() => {}} style={styles.input.root}>
                    <input hidden={true} {...getInputProps()}></input>
                    <div
                        style={styles.input.editor}
                        contentEditable="true"
                        onKeyDown={(e) => {
                            if (!e.ctrlKey && !e.shiftKey && e.key === 'Enter') {
                                handleSubmit();
                                e.preventDefault();
                            }
                        }}
                        ref={inputRef}
                    ></div>
                    <SendOutlined onClick={handleSubmit} style={styles.input.send} />
                </div>
            </div>
        </div>
    );
}
