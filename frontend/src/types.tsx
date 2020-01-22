

export type Message = {
    type: 'bot';
    message: string;
    navigation?: number;
};

export type Response = {
    type: 'human';
    options: Option[];
};

export type Option = {
    message: string;
    navigation?: number;
}