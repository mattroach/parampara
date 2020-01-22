



export enum ItemType {
    Message, ChooseResponse, Email
}

export type Item = {
    type: ItemType;
};

export type MessageItem = {
    type: ItemType.Message;
    message: string;
}

export type ChooseResponseItem = {
    type: ItemType.Message;
    Responses: ResponseChoice[];
}

export type ResponseChoice = {
    message: string;
    nextId: number;
}




const exampleScript = {
    updatedTimestamp: '',
    items: [
        {type: 'MESSAGE', message: 'Hows your day?'},
        {type: 'CHOOSE_RESPONSE', responses: [
            {message: 'Good'},
            {message: 'Bad', nextId: 3}
        ]},
        {type: 'MESSAGE', message: 'Nice to hear!', nextId: 4},
        {type: 'MESSAGE', message: 'Sorry to hear that.'},
        {type: 'MESSAGE', message: 'I am emailing you a document. What do you think about that?'},
        {type: 'EMAIL', CONTENT: 'Hello! please see <a href="http://">this document</a>'},
        {type: 'COLLECT_COMMENT'},
        {type: 'MESSAGE', message: 'Good bye!'},
    ]
};

// Used only for re-building the chat UX, not used or reporting algorithms
const exampleProgress = {
    createdTimestamp: '',
    items: [
        {type: 'MESSAGE', message: 'Hows your day?'},
        {type: 'CHOOSE_RESPONSE', choice: 0, responses: [
            {message: 'Good'},
            {message: 'Bad'}
        ]},
        {type: 'MESSAGE', message: 'Nice to hear!'},
        {type: 'COLLECT_COMMENT', content: 'This is my freeform response'},
    ]
}

// Used for reporting algorithms
const exampleResponses = [
    {
        userId: 32451,
        scriptId: 124,
        itemId: 100,
        responseId: 100,
        message: 'Hows your day?',
        response: 'Good',
    },
    {
        userId: 32451,
        scriptId: 124,
        itemId: 100,
        responseId: 101,
        message: 'How was your day?',
        response: 'Bad',
    }
]

// Used for reporting algorithms
const exampleComments = [
    {
        userId: 32451,
        scriptId: 124,
        itemId: 100,
        message: 'Any other questions?',
        content: 'This is my freeform response'
    }
]