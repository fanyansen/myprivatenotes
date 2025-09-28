import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  fromPromise,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { EXPRESS_URI, GRAPHQL_URI } from "../constants/env";
import { getToken, isAuthenticated, saveToken } from "./auth";
// import { GRAPHQL_URI } from "../constants/env";
// import { getToken } from "./auth";
import { MutationBaseOptions } from "@apollo/client/core/watchQueryOptions";
import { TokenRefreshLink } from "apollo-link-token-refresh";

const errorLink = new ErrorLink(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
      for (const err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            return fromPromise(
              fetch(`${EXPRESS_URI}/refresh-token`, {
                method: "POST",
                credentials: "include",
              })
                .then(async (response) => {
                  const { access_token: newAccessToken } =
                    await response.json();
                  saveToken(newAccessToken);
                  return newAccessToken;
                })
                .catch((error) => {
                  // Handle token refresh errors e.g clear stored tokens, redirect to login

                  saveToken("");
                  window.location.href = "/login";
                  return;
                })
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
                const oldHeaders = operation.getContext().headers;
                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                });

                // retry the request, returning the new observable
                return forward(operation);
              });
        }
      }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

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
  handleResponse: (_, accessTokenField) => async (response: Response) => {
    console.log("refreshLink - handleResponse - response", response);
    const jsonRes = await response.json();
    const { access_token, success } = jsonRes;
    console.log("jsonRes", jsonRes);
    if (!success) {
      window.location.href = "/login";
      throw new Error("Failed to refresh token");
    }
    return { [accessTokenField]: access_token };
  },
  handleError: (err) => {
    // full control over handling token fetch Error
    console.warn("Your refresh token is invalid. Try to relogin");
    saveToken("");
    window.location.href = "/login";
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
  link: ApolloLink.from([refreshLink, authLink, httpLink]),
  // link: ApolloLink.from([errorLink, authLink, httpLink]),
  // link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: fetchOptions,
    query: fetchOptions,
    mutate: fetchOptions,
  },
});
