import { Drawer, Spin } from 'antd';
import { useEffect } from 'react';

import './DrawerCustom.scss';

type IProps = {
    visible: boolean;
    loading: boolean;

    closeModal: Function;
    title?: string;

    contentDrawer: any;
};

function DrawerCustom(props: IProps) {
    useEffect(() => {}, [props.visible]);

    return (
        <Drawer
            title={props.title || false}
            placement="right"
            width={550}
            onClose={() => props.closeModal()}
            visible={props.visible}
            getContainer={false}
            closable={false}
        >
            <Spin spinning={props.loading}>{props.contentDrawer}</Spin>
        </Drawer>
    );
}

export default DrawerCustom;
