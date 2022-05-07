import React, { useEffect } from 'react';
import authApi from '../../../../api/authApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../../../app/userSlice';
import { openNotificationWithIcon } from '../../../../functions/global';

export default function GoogleLoginPage() {
    const location = useLocation();
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        authApi
            .getGoogleLogin(location.search)
            .then((response) => {
                if (response) {
                    dispatch(setUserLogin({ ...response, isLogin: true }));
                    openNotificationWithIcon('success', 'Login successfully!', '');
                    nav('/home');
                }
            })
            .catch(() => {
                openNotificationWithIcon('warning', 'Verify failure!', '');
                nav('/auth/login');
            });
    }, []);
    return <div>Đang xác thực, vui lòng đợi</div>;
}
