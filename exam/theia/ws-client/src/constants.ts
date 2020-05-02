export const basename = 'ws-client';

const withBasename = (str: string) => basename + str;

export const CONSTS = {
    CommandID: {
        Submit: withBasename('submit')
    }
};