import Head from "next/head";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "@graphql-documents/gql-client/index";
import { AmazeProvider } from "../utils/index";
import { Provider } from "react-redux";
import { store } from "state/store";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AmazeProvider>
          <Component {...pageProps} />
        </AmazeProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
