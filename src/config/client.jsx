import { ApolloClient, InMemoryCache } from '@apollo/client';
const API_BASE_URL = "https://staging.thecloudquery.com";

const apolloClient = new ApolloClient({
  uri: `${API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default apolloClient;