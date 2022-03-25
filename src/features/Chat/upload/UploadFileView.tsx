import React, { CSSProperties } from 'react';
import { defaultStyles, FileIcon } from 'react-file-icon';

export default function UploadFileView(prop: {
    className?: string;
    style?: CSSProperties;
    files: File[];
}) {
    return (
        <div className={[prop.className].join(' ')} style={prop.style}>
            {prop.files.map((file) => {
                const type = file.type;
                const extension = type.split('/')[1];

                console.log(file);
                return (
                    <div>
                        <div style={{ width: '2em' }}>
                            <FileIcon extension={extension} />
                        </div>
                        <div>{file.name}</div>
                    </div>
                );
            })}
        </div>
    );
}
