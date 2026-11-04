import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    url: 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
});