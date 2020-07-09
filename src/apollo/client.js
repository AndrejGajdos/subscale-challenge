import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getUser, LOGGED_USER_EMAIL } from '../utils/manageTokens';
import { SERVER_URL } from '../utils/config';
import gql from 'graphql-tag';

const httpLink = new HttpLink({
	uri: SERVER_URL,
});
const cache = new InMemoryCache();

export const client = new ApolloClient({
	link: httpLink,
	cache,
	resolvers: {},
});

cache.writeData({
	data: {
		loggedEmail: getUser() ? getUser()[LOGGED_USER_EMAIL] : null,
	},
});

export const LOGGED_USER = gql`
	query GetLoggedUser {
		loggedEmail @client
	}
`;
