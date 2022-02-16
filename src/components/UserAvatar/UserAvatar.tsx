import { Avatar } from 'antd';
import React, { CSSProperties } from 'react';
import { users } from '../../features/Chat/seed';

const styles: { size: { small: CSSProperties; tiny: CSSProperties } } = {
    size: {
        small: {
            width: '3em',
            height: '3em',
        },
        tiny: {
            width: '1.5em',
            height: '1.5em',
        },
    },
};

export default function UserAvatar(prop: {
    userId: string;
    size: 'small' | 'tiny';
    className?: string;
    style?: CSSProperties;
}) {
    // const src = users[prop.userId].avatar
    const src =
        'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F08%2F08%2F09%2F17%2Favatar-1577909_960_720.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fvectors%2Favatar-icon-placeholder-facebook-1577909%2F&tbnid=IdAFWUi25smL9M&vet=12ahUKEwieqLKOpIP2AhXDeN4KHXiVBcgQMygDegUIARDbAQ..i&docid=cyPowwVV5ZV6IM&w=720&h=720&q=avatar%20image&ved=2ahUKEwieqLKOpIP2AhXDeN4KHXiVBcgQMygDegUIARDbAQ';
    return (
        <Avatar
            className={[prop.className].join(' ')}
            src={src}
            style={{ ...styles.size[prop.size], ...prop.style }}
        ></Avatar>
    );
}
