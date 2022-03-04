import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { TProps } from '../../types/component';
import { NotifyType } from '../../types/notify.type';

export default function NotifyItem(props: TProps & { notify: NotifyType }) {
    const styles = useStyles();
    return (
        <div className={[props.className, 'NotifyItem'].join(' ')} style={props.style}>
            <Header>{props.notify.from}</Header>
        </div>
    );
}

function useStyles() {
    return {};
}
