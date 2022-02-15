export interface MessageType {
    _id: string;
    from: string;
    content: {
        type: 'text' | 'image' | 'file';
        data: string;
    };
    at: Date;
}
