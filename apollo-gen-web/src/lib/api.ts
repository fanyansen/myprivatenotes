import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { EXPRESS_URI, GRAPHQL_URI } from "../constants/env";
import { getToken, isAuthenticated, saveToken } from "./auth";
// import { GRAPHQL_URI } from "../constants/env";
// import { getToken } from "./auth";
import { MutationBaseOptions } from "@apollo/client/core/watchQueryOptions";
import { TokenRefreshLink } from "apollo-link-token-refresh";

const fetchOptions: MutationBaseOptions = { errorPolicy: "all" };

const refreshLink = new TokenRefreshLink({
  accessTokenField: "access_token",
  isTokenValidOrUndefined: async () => isAuthenticated(),
  fetchAccessToken: () => {
    return fetch(`${EXPRESS_URI}/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => saveToken(accessToken),
  // handleResponse: (operation, accessTokenField) => () => {
  //   // here you can parse response, handle errors, prepare returned token to
  //   // further operations
  //   // returned object should be like this:
  //   // {
  //   //    access_token: 'token string here'
  //   // }
  // },
  handleError: (err) => {
    // full control over handling token fetch Error
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${getToken()}`,
  },
}));

export const client = new ApolloClient<NormalizedCacheObject>({
  // link: ApolloLink.from([refreshLink, authLink, httpLink]),
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: fetchOptions,
    query: fetchOptions,
    mutate: fetchOptions,
  },
});
