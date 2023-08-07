import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { API_URL } from "../constants/env";

const httpLink = createHttpLink({
  uri: API_URL,
  credentials: "include",
});

const client = new ApolloClient<NormalizedCacheObject>({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});

export default client;
