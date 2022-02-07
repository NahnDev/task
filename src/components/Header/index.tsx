import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userApi from '../../api/userApi'
import { setUser } from '../../app/userSlice'
import { TProps } from '../../types/component'
import { User } from '../../types/global'

function Header(props: TProps) {
    const user: User = useSelector((state: any) => state.user)
    const dispatch = useDispatch()

    const getUser = async (_id: string) => {
        try {
            const response: any = await userApi.getUserDetail(_id)
            dispatch(setUser(response))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser(user._id)
    }, [user.name !== undefined])

    return <div>Header</div>
}

export default Header
