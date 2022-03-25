export interface MessageType {
    _id: string;
    room: string;
    from: string;
    content: {
        t: string;
        data: string;
    };
    at: Date;
}

export interface MessageSlice {
    [rId: string]: MessageType[];
}
