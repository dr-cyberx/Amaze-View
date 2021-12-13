import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

const httpLink: ApolloLink = createHttpLink({
  uri: "http://localhost:4000/amazeview",
});

const authLink: ApolloLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth-Token");

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllPost: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});
