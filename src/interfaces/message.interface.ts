export interface IMessage {
    _id: string
    from: string
    content: {
        type: 'text' | 'image' | 'file'
        text?: string
        files?: string[]
        images?: string[]
    }
    at: Date
}
