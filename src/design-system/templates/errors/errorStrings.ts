export type ErrorMessage = {
    english: string;
    japanese?: string;
    friendlyCode?: string;
};

const defaultMessage: Required<ErrorMessage> = {
    english: `Something went bad. How could this happen?`,
    japanese: `わかりません...`,
    friendlyCode: 'Oops.',
};

export const errorMessages: { [code: string]: ErrorMessage } = {
    default: defaultMessage,
    '400': {
        english: 'Your client sent me something weird...',
        japanese: '((((；゜Д゜)))',
    },
    '403': {
        english: `You weren't allowed to access this.`,
        japanese: 'あなたはこの点に合格しないかもしれません',
    },
    '404': {
        english: `This page is in another castle.`,
        japanese: 'お探しのページは見つかりませんでした',
    },
    '419': {
        english: 'Something went too slowly...',
        japanese: 'おやすみなさい〜',
    },
    '500': {
        english: `The server doesn't like you right now. Feed it a cookie.`,
        japanese: 'クッキーを送ってください〜  クッキーを送ってください〜',
    },
    serverFailure: {
        english: `Server is super unhappy with you today...`,
        japanese: 'クッキーを送ってください〜',
        friendlyCode: `Oh no!`,
    },
    magicExpired: {
        english: 'That magic login link was expired.',
        friendlyCode: 'Woah.',
    },
    authFailure: {
        english: `I tried to tell the server who you were...`,
        japanese: `...but it didn't believe me. :( ごめんなさい`,
        friendlyCode: 'Yo.',
    },
};

export const getMessageFromCode = (
    code: keyof typeof errorMessages
): Required<ErrorMessage> => {
    const codeStr = String(code);
    const baseMessage = errorMessages[codeStr];

    const message: Required<ErrorMessage> = {
        english: baseMessage?.english || defaultMessage.english,
        japanese: baseMessage?.japanese || defaultMessage.japanese,
        friendlyCode: baseMessage
            ? baseMessage?.friendlyCode || codeStr
            : defaultMessage.friendlyCode,
    };

    return message;
};
