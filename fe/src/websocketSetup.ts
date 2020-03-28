import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';

const ssl = process.env.SSL_ENABLED ? 's' : '';
const uri = process.env.API_URL_DOMAIN ? `http${ssl}://${process.env.API_URL_DOMAIN}/graphql` : 'http://localhost:3000/graphql';
const wsUri = process.env.API_URL_DOMAIN ? `ws${ssl}://${process.env.API_URL_DOMAIN}/graphql` : 'ws://localhost:3000/graphql';


const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri,
  credentials: 'include',
});

export const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);