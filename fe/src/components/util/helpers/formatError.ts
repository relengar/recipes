import { ApolloError } from 'apollo-boost';

export function formatError(error: ApolloError): string {
    const splitMessage = error?.message.split(':');
    const message =  splitMessage.length > 1 ? splitMessage[1] : splitMessage[0];
    return message.trim();
}
